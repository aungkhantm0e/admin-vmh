const mongoose=require("mongoose");

// Follow-up schema without _id
const followUpSchema = new mongoose.Schema({
  question: String,
  question_title: String,
  question_id: String
}, { _id: false });

// Question schema without _id
const questionItemSchema = new mongoose.Schema({
  question: String,
  question_title: String,
  question_id: String,
  follow_up: {
    type: [followUpSchema],
    default: undefined
  }
}, { _id: false });

// Section schema without _id
const sectionSchema = new mongoose.Schema({
  category: String,
  questions: [questionItemSchema]
}, { _id: false });

// Final top-level schema
const questionSchema = new mongoose.Schema({
  sections: [sectionSchema]
});

module.exports=mongoose.model("Question",questionSchema);
