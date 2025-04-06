const Patient=require("../models/patient");
const Questions=require("../models/questions");


//fetch all patient data
exports.allPatient=(async (req,res)=>{
    try{
        //fetch all patients
        const patients=await Patient.find({}); 
        // console.log(patients);
        res.render("patients",{patients}); //pass data to patients.ejs
    }catch(err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

//Edit patient
exports.editPatient=(async (req,res)=>{
    const patientId=req.params.id;
    //fetch patient and questions data from database
    const patient= await Patient.findOne({patient_id:patientId})
    const questions= await Questions.findOne();

    if (!patient || !questions){
        return res.status(404).send("Patient not found");
    }
    res.render("edit_patient",{patient,questions});
})

//Submit edited patient
exports.updatePatient=(async (req,res)=>{
    const patientId=req.params.id;
    const updates=req.body;
    //fetch patient's data
    const patient=await Patient.findOne({patient_id : patientId});
    if(!patient) return res.send(404).send("Patient Not Found")
    
    //Update response
    patient.response.forEach(r=>{        
        if(updates[r.question_id]){//that returns the response value from the form
            r.response=updates[r.question_id]            
        }
    });
    //tells mongoose to modify response Array cuz Mongoose can't track changes in nested Array.
    patient.markModified("response");

    await patient.save();
    res.redirect("/patients");
});

//search patient
exports.searchPatient=async (req,res)=>{
    const query=req.query.q;

    try{
        //Searching within 'response' array for fields like name, id
        const patients=await Patient.find({
            $or:[
                {"response.response":new RegExp(query,'i')}
            ]
        });
        res.render("patients",{patients})
    }catch(err){
        console.error(err);
        res.status(500).send("Server Error")
    }
}

//delete patient
exports.deletePatient=(async (req,res)=>{
    const patientId=req.params.id;

    //find and delete the patient
    const deletedPatient=await Patient.findOneAndDelete({patient_id : patientId});

    if(!deletedPatient){
        return res.status(404).send("Patient Not Found")
    }

    res.redirect("/patients");
})


