const express=require("express");
const router=express.Router();
const adminController=require("../controllers/adminController")

router.get("/admin",adminController.admin)

//Create admin account 
router.post("/admin",adminController.adminCreate)

module.exports=router;