const express=require("express");
const router=express.Router();
const homeController=require("../controllers/homeController");

//index page
router.get("/",homeController.indexPage);

module.exports=router