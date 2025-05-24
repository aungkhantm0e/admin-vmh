const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    session_id: Number,
    patient_id: Number,
    response:[Object],
    session_info: {
        session_end: Date,
        session_start: Date
    }
})

module.exports=mongoose.model("patient", patientSchema);