const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    session_id: Number,
    patient_id: Number,
    response:[Object],
    session_info: {
        session_start: {
            date: Date
        },
        session_end: {
            date: Date
        }
    }
})

module.exports=mongoose.model("patient", patientSchema);