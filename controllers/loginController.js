const Admin=require("../models/admin")
const bcrypt=require("bcryptjs");

//Display login page logic
exports.loginPage=(req,res)=>{
    res.render("login");
}

//Login Logic
exports.loginAdmin=async (req,res)=>{
    const {username,password}=req.body;
    const admin=await Admin.findOne({username});
    if(!admin){
        return res.send("Admin not found.")
    }

    const match=await bcrypt.compare(password,admin.password);
    if (!match) {
        return res.send('Incorrect password');
    }
    req.session.adminId = admin._id;
    req.session.username =admin.username;
    res.redirect('/');
}


//Logout logic
exports.logoutAdmin=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/");
    })
}

