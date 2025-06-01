const Questions=require("../models/questions");

exports.questionForm=(async (req,res)=>{
    const questionDoc=await Questions.findById(process.env.QUESTION_ID);
    res.render("add_questions",{questionDoc})
})

// Add questions
exports.addQuestions=(async (req,res)=>{
    try{
        const {
            section,
            question,
            question_title,
            follow_ups //This is an array of objects if multiple follow-ups are added
        }=req.body;
    
        const hasFollowUp=!!follow_ups; //check if follow_ups exist
        const questionDoc= await Questions.findById(process.env.QUESTION_ID)

        const sectionIndex=parseInt(section);
        const selectedSection=questionDoc.sections[sectionIndex]

        //Compute main question index
        const questionIndex=selectedSection.questions.length;
        const mainQuestionId=`q${sectionIndex}_${questionIndex}`;

        //Create new question object
        const newQuestion={
            question,
            question_title,
            question_id:mainQuestionId         
        };

        //Handle follow-up questions if any
        if(hasFollowUp && Array.isArray(follow_ups)){
            const followUps=follow_ups.map((fup,index)=>({
                question: fup.question,
                question_title: fup.question_title,
                question_id: `${mainQuestionId}_${index}`           
            }));
            newQuestion.follow_up=followUps;
        }

        //push to section questions and save
        selectedSection.questions.push(newQuestion);
        await questionDoc.save();

        res.redirect("/patients");
    }catch(error){
        console.log("Error adding question:", error);
        res.status(500).send("Internal Server Error");
    }
})

// Edit questions
exports.editQuestions=(async (req,res)=>{
    const questionDoc=await Questions.findById(process.env.QUESTION_ID);
    res.render("edit_questions",{questionDoc})
})
//Update questions
exports.updateQuestion = async (req, res) => {
  try {
    const updatedSections = req.body.sections;

    const formattedSections = Object.values(updatedSections || {}).map(section => ({
      category: section.category,
      questions: Object.values(section.questions || {}).map(q => ({
        question: q.question,
        question_title: q.question_title,
        question_id: q.question_id,
        follow_up: q.follow_up
          ? Object.values(q.follow_up).map(fu => ({
              question: fu.question,
              question_title: fu.question_title,
              question_id: fu.question_id
            }))
          : undefined
      }))
    }));

    await Questions.updateOne({}, { sections: formattedSections });
    res.redirect("/edit/questions");
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).send("Error updating questions.");
  }
};


//CATEGORY
//Category Form
exports.categoryForm=(async(req,res)=>{
    res.render("add_category");
})
//Add new category
exports.addCategory=(async (req,res)=>{
    const {category}=req.body;

    try{
        const questionDoc=await Questions.findById(process.env.QUESTION_ID);
        questionDoc.sections.push({
            category,
            questions:[]  
        });

        await questionDoc.save();

        res.redirect("/add_questions");

    }catch(error){
        console.log("Error adding category:", error);
        res.status(500).send("Server Error");
    }
})

