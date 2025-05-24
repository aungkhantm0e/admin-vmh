const express=require("express");
const router=express.Router();
const userController=require("../controllers/userController")

router.get("/register",userController.signup)

//Create admin account 
router.post("/register",userController.userCreate)

module.exports=router;