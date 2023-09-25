const express = require("express");
const router = express.Router();

const {login , signup}= require("../Controller/Auth");


router.post("/signup" , signup);

module.exports = router;