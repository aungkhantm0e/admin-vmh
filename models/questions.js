const mongoose=require("mongoose");

const questionSchema = new mongoose.Schema({
    sections:[
        {
            category: String,
            questions: [
              {
                question: String,
                question_title: String,
                question_id: String,
                follow_up: [
                    {
                        question: String,
                        question_title: String,
                        question_id: String
                    }
                ]
              }
            ]
        }
    ]
})

module.exports=mongoose.model("Question",questionSchema);
