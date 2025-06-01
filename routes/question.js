const express=require("express");
const router=express.Router();
const questionController=require("../controllers/questionController")
const {isAdmin}=require("../controllers/auth")

//Questions
router.get("/add_questions",isAdmin,questionController.questionForm)
router.post("/questions/add",isAdmin,questionController.addQuestions)
router.get("/edit/questions",isAdmin,questionController.editQuestions)
router.post("/questions/edit",isAdmin,questionController.updateQuestion)

//Category
router.get("/add_category",isAdmin,(req,res)=>{
    res.render("add_category");
})
router.post("/add_category",isAdmin,questionController.addCategory);

module.exports=router