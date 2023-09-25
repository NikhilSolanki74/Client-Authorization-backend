
require("dotenv").config();
const jwt = require("jsonwebtoken")

exports.auth = (req , res , next)=>{
    try{
         const token = req.body.token;
      
         if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is Missing bro'
            })
         }
         try{
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode
         }catch(error){
            return res.status(401).json({
                success:false,
                message:'token in invalid bro'
            })  
         }
      next();
    } catch(error){
        console.log(error)
          return res.status(401).json({
            success:false,
            message:"something wents wrong while excessing the token bro"
          })
    }
}


exports.isStudent=(req , res , next)=>{
    try{
    if(req.user.role !== "Student"){
        return res.status(400).json({
            success:false,
            message:"Sorry this is the protected route for Student bro "
        })
    }
       next();
    }catch(error){
         return res.status(500).json({
            success:false,
            message:"User role is not matching bro"
         })
    }
}


exports.isAdmin=(req , res , next)=>{
    try{
    if(req.user.role !== "Admin"){
        return res.status(401).json({
            success:false,
            message:"Sorry this is protect for Admin not for you bro"
        })
    }
    next();
    }catch(error){
         return res.status(500).json({
            success:false,
            message:"User role is not matching bro"
         })
    }
}
