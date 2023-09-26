const express = require("express");
const router = express.Router();
const {isAdmin , isStudent , auth } = require("../middleware/auth")
const {login , signup}= require("../Controller/Auth");


router.post("/login", login);
router.post("/signup" , signup);

router.get("/student" , auth , isStudent , (req , res)=>{
    res.json({
        success:true,
        message:'welcome to the protected route for student bro'
    })
})

router.get("/admin" , auth , isAdmin , (req , res) => {
    res.json({
        success:true,
        message:'welcome to protected route for Admin bro'
    })
})
router.get("/test" , auth ,(req , res) => {
    res.json({
        success:true,
        message:'welcome to protected route for Test(test) bro'
    })
})

module.exports = router;