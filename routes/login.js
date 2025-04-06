const express=require("express");
const router=express.Router();
const loginController=require("../controllers/loginController")


//Login Page
router.get("/login",loginController.loginPage);

//Login submit
router.post("/login",loginController.loginAdmin)

//Logout
router.get("/logout",loginController.logoutAdmin)

module.exports=router