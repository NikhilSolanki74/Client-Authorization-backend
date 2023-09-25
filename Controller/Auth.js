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


