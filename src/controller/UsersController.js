
const OtpModel = require("../models/OtpModel");
const UserModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const SendEmailUtility = require ('../utility/SendEmailUtility')

// Registration start

exports.Registration = async (req, res) => {
    const data = req.body;

    try {
        const result = await UserModel.create(data);
        res.status(200).json({ status: "success", message: "user create successfully", data: result })
    }
    catch (error) {
        res.status(400).json({ status: "failed", message: error.message })

    }
}

// Registration end


// Login start

exports.Login = async (req, res) => {

    const reqbody = req.body;
    try {
        let User = await UserModel.findOne({ email: reqbody.email })

        if (!User) {
            return res.status(400).json({ status: 'fail', message: 'user not found' })
        }

        if (User.password !== reqbody.password) {
            return res.status(400).json({ status: 'fail', message: 'invalid password' })
        }

        else {
            let payload = {
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: User['email']
            };

            let token = jwt.sign(payload, '123456789')
            const responseData = { email: User['email'], firstName: User['firstName'], lastName: User['lastName'],profilePicture:User['profilePicture'] }
            res.status(200).json({ status: 'success', data:responseData, token: token })
        }


    }
    catch (error) {
        res.status(400).json({ status: 'fail', message: error.message })

    }
}


// Login end


// updateProfile start

exports.UpdateProfile = async (req, res) => {
    try {
        let email = req.headers.email
        let reqbody = req.body
        let query = { email: email }
        let user = await UserModel.updateOne(query, reqbody)
        res.status(200).json({ status: 'success', data: user })

    }
    catch {
        res.status(400).json({ status: 'fail', message: error.message })

    }


}


// updateProfile end


// profile detels start

exports.profileDetels = async (req, res) => {
    try {
        let email = req.headers.email
        let query = { email: email  }
        const user = await UserModel.findOne(query)
        res.status(200).json({ status: 'success', data: user })
    }
    catch (error) {
        res.status(400).json({ status: 'fail', data: error })
    }
}

// profile detels end

// EmailVeryfy start korte pari nai karon email 2-step verify hoche na

exports.emailVerify = async(req,res)=>{
    try{
        let email = req.params.email;
        let query={email:email};
        let otp = Math.floor(100000 + Math.random()*900000)
        const user = await UserModel.findOne(query)
        if(!user){
            res.status(200).json({status:'fail' , data:'user not found'})

        }
        else{
            let createOtp = await OtpModel.create({email:email, otp:otp})
            let sendEmail = SendEmailUtility(email,'To-do-Taskar password verification', `you otp is ${otp}`)
            res.status(200).json({status:'success', data:'OTP send successfully'})
        }

    }
    catch(error){
        res.status(200).json({status:'fail', data:error})


    }
}





// EmailVeryfy start korte pari nai karon email 2-step verify hoche na


// Otp verify start

exports.OtpVerify = async (req,res)=>{
    try{
       let email= req.params.email;
       let otp = req.params.otp;
       let status = 0;
       let updateStatus= 1;

       const otpCheck = await OtpModel.aggregate([
        {$match: { email:email , otp:otp}},
        {$count: 'total'}

       ]) 

       if(otpCheck.length>0){
        let updateOtp = await OtpModel.updateOne({email:email, otp:otp,status:status},{email:email,otp:otp, status:updateStatus})
        res.status(200).json({status:'success' , data:'otp verify successfully'})

       }
       else{
        res.status(200).json({status:'fail', data:'invalid Otp'})
       }
       
    }
    catch(error){
        res.status(400).json({status: 'fail', data: error})

    }

}



// Otp verify end


// Reset password start

  exports.resetPassword  = async(req,res)=>{

    try{
        let email = req.body.email;
        let otp = req.body.otp;
        let updatePassword =req.body.password;
        let updateStatus = 1

        const otpCheck = await UserModel.aggregate([
            {$match: { email:email , otp:otp , status:updateStatus}},
            {$count: 'total'}
    
           ]) 

           if(otpCheck.length>0){
            let passwordUpadate = await OtpModel.updateOne({email:email} , { password:updatePassword })
            res.status(200).json({status:'success' , data:'password reset successfully'})

           }
    
    }
    catch(error){
        res.status(200).json({status:'fail' , data: error})
    }

  }


// Reset password end 









