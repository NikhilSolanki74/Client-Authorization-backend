const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config(); 

exports.signup = async (req, res) => {
    try{
         const {name , email , password , role}= req.body;

         const existingUser = await User.findOne({email});
         if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist"
            })
         }
         let hashedPassword;
         try{
              hashedPassword = await bcrypt.hash(password , 10);
         }
         catch(err){
            return res.status(500).json({
                success:false,
                message:'error in hashing password bro'
            })
         }
         const user = await User.create({
            name , email , password:hashedPassword, role
         })
         return res.status(200).json({
            success:true,
            message:"user created successfullyy bro"

         })
    }
    catch(error){
   console.error(error);
   return res.status(500).json({
    success:false,
    message:'user cannot be registered , please try again later'
   })
    }
}


//login

exports.login = async (req , res) =>{
   try{
      const {email , password}=req.body;
      //validation
      if(!email || !password){
         return res.status(400).json({
            success:false,
            message:"data in not appropriate , Fill the information carefully"
         })
      }
      let user = await User.findOne({email});
      if(!user){
         return res.status(401).json({
            success:false,
             message:"User name was not found "
         })}
         const payload = {
            email:user.email,
            id:user._id,
            role:user.role
         }
         if(await bcrypt.compare(password , user.password)){
               let token = jwt.sign(payload ,process.env.JWT_SECRET , {
                  expiresIn:"2h"
               })
               console.log(user);
               user = user.toObject();
               user.token = token;
               console.log(user);
               user.password = undefined;
               console.log(user);
               const options = {
                     expires:new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                     httpOnly:true,
               }
               res.cookie("nkcookie", token , options).status(200).json({
                  success:true,
                  token,
                  user,
                  message:'User Logged in successfully'
               })
         }
         else{
            return res.status(401).json({
               success:false,
               message:"the password is not valid "
            })
            
         }
   }
   catch(error){
         console.log(error)
         return res.status(400).json({
            success:false,
            message:'login failure bro'
         })
   }

}