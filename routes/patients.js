const express=require("express");
const router=express.Router();
const patientController=require("../controllers/patientController")


//Viewing Patient's Data
router.get('/',patientController.allPatient)
//View patient's data
router.get('/view/:id',patientController.showPatient)
//Edit patient's data
router.get('/edit/:id',patientController.editPatient)
//Update patient's data
router.post("/update_patient/:id",patientController.updatePatient)
//Search patient's data
router.get("/search",patientController.searchPatient)
//Delete patient's record
router.post("/delete_patient/:id",patientController.deletePatient);
//New Patient's Form
router.get("/new_patient",patientController.patientForm)
//Add new patient
router.post("/submit_form",patientController.addPatient)

//chain response cuz the para is similar 
router
    .route("/:id")
    .get((req,res)=>{
        console.log(req.user);
        res.send(`Get Patient id ${req.params.id}`);
    })    
    .put((req,res)=>{
    res.send(`Update Patient id ${req.params.id}`);
    })
    .delete((req,res)=>{
    res.send(`Delete Patient id ${req.params.id}`);
    })


module.exports=router
