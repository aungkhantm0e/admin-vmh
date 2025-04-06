const Admin = require("../models/admin");
const bcrypt=require('bcryptjs');

exports.admin=(req,res)=>{
    res.render("admin"); 
};

//Create admin account 
exports.adminCreate=async (req,res)=>{
    const {username, email, password}=req.body;

    //Hash password with bcrypt before saving into mongo
    const hashedPassword=await bcrypt.hash(password, 10);

    //Create new admin document
    const newAdmin=new Admin({
        username,
        email,
        password: hashedPassword
    });

    //save to database
    await newAdmin.save();

    res.send("Admin created successfully!")
};