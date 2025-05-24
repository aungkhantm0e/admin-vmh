const User = require("../models/user");
const bcrypt=require('bcryptjs');

exports.signup=(req,res)=>{
    res.render("register"); 
};

//Create admin account 
exports.userCreate=async (req,res)=>{
    const {username, email, password, confirmPassword, role}=req.body;

    //Check if password and confirm password match
    if(password !== confirmPassword){
        return res.status(400).send("Passwords do not match");
    }
    //Hash password with bcrypt before saving into mongo
    const hashedPassword=await bcrypt.hash(password, 10);

    //Create new admin document
    const newUser=new User({
        username,
        email,
        password: hashedPassword,
        role
    });

    //save to database
    await newUser.save();

    res.redirect("/login")
};