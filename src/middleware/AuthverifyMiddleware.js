const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
  
  let token=req.headers['token']

  jwt.verify(token, '123456789', (err, decoded) =>{

    if(err){
       return res.status(400).json({ status:'fail', message:'unathurized'})
    }

    else{
        email=decoded.data
        req.headers.email= email
        next()
    }
    
  });
}


