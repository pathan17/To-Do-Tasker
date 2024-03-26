const nodemailer = require("nodemailer");

const SendEmailUtility = async(Emailto , EamilSubject,EmailText)=>{

    const transporter = nodemailer.createTransport({
        service: "Gmail",
      
        auth: {
          user: "badhanpathan17@gmail.com",
          pass: "bfjt rhbz xhks qwcx",
        },
      });

      let mailOptions={
       from:' "To-Do-Taskar" <badhanpathan17@gmail.com>',
       to:Emailto ,
       subject: EamilSubject,
       text : EmailText,

    }

    return await transporter.sendMail(mailOptions)
  
}
module.exports = SendEmailUtility;