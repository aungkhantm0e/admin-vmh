const Patient=require("../models/patient");
const Questions=require("../models/questions");


exports.allPatient=(async (req,res)=>{
    try{
        //fetch all patients
        const patients=await Patient.find({});

        res.render("patients",{patients}); //pass data to patients.ejs
    }catch(err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
//Show patient
exports.showPatient=(async (req,res)=>{
    const patientId=req.params.id;
    //fetch patient and questions data from database
    const patient= await Patient.findOne({patient_id:patientId})
    const questions= await Questions.findOne();

    if (!patient || !questions){
        return res.status(404).send("Patient not found");
    }
    res.render("view_patient",{patient,questions});
})


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

//patient form
exports.patientForm=(async (req,res)=>{
    try {
        const form = await Questions.findOne(); // You can query by ID if needed
        res.render('patient_form', { form });
    } catch (err) {
        res.status(500).send('Error loading form');
    }
})

//add patient
exports.addPatient=(async (req,res)=>{
    const patientData=req.body;   
    //Fetch Question doc from Questions collection to match the questions_title from response
    const questionDoc=await Questions.findOne({})
    const allQuestions=[]

     questionDoc.sections.forEach(section => {
      section.questions.forEach(q => {
        allQuestions.push(q);
        // Also include follow-up questions if present
        if (Array.isArray(q.follow_up) && q.follow_up.length>0) {
          q.follow_up.forEach(fu => allQuestions.push(fu));
        }
      });
    });

    console.log(allQuestions);

    //looping and destructuring each element of patientData<Array> with [question_title,answer]
    const responseArray=Object.entries(patientData).map(([question_title,answer])=>{
        const match = allQuestions.find(q=>q.question_title===question_title);    
      return{  
        question_id:match?.question_id || question_title,
        question:question_title,
        response:answer,
        time: new Date()
      };
    });

       
    const now = new Date();

    const newPaient=new Patient({
        patient_id: Math.floor(Math.random()*100000),
        session_id: Math.floor(Math.random()*100000),
        response: responseArray,
        session_info:{
            session_start:now,
            session_end:now
        }
    });

    await newPaient.save()

    res.redirect("/patients")

})

