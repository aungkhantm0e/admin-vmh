const express=require("express");
const router=express.Router();
const questionController=require("../controllers/questionController")

//Questions
router.get("/add_questions",questionController.questionForm)
router.post("/questions/add",questionController.addQuestions)

//Category
router.get("/add_category",(req,res)=>{
    res.render("add_category");
})
router.post("/add_category",questionController.addCategory);

module.exports=router