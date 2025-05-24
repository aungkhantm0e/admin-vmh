const User=require("../models/user")
const bcrypt=require("bcryptjs");

//Display login page logic
exports.loginPage=(req,res)=>{
    res.render("login",{error:null});
}

//Login Logic
exports.loginUser=async (req,res)=>{
    const {email,password}=req.body;
    let error=null

    const user=await User.findOne({email});
    if(!user){
        error="This user doesn't exist!!!"
    }else{
        const match=await bcrypt.compare(password,user.password);
        if (!match) {
           error="Invalid username and password!!!"
        }
    }

    if(error){
        return res.render("login",{error});
    }

  
    //Save session
    req.session.user={
        id:user._id,
        role:user.role
    }
    // req.session.adminId = admin._id;
    // req.session.username =admin.username;
    res.redirect('/');
}


//Logout logic
exports.logoutUser=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/login");
    })
}

