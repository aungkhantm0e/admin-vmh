const express=require("express");
const mongoose = require('mongoose');
const adminRoutes=require("./routes/admin")
const loginRoutes=require("./routes/login")
require('dotenv').config();

const app=express();
const session=require('express-session')

// MongoDB Atlas Connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

//Generate SESSION KEY
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

//passing session to every page
app.use((req,res,next)=>{
  res.locals.adminId=req.session.adminId;
  res.locals.username=req.session.username;
  next();
})

//Setting up View Engine
app.set("view engine", 'ejs');

//handle html form submission
app.use(express.urlencoded({extended:true}));
//parse those request data into JSON format
app.use(express.json());
//serve static files (CSS,JS,Images) from the 'public' folder
app.use(express.static('public'));



app.get("/",(req,res)=>{
    res.redirect("/patients")
})

//---------------ADMIN-----------------
//Admin routes
app.use(adminRoutes)

//---------------LOGIN-----------------
//Login routes
app.use(loginRoutes)

//--------------PATIENT-----------------
//Patient's routes
const patientRouter=require("./routes/patients")
app.use("/patients",(req,res,next)=>{     //this middlware only runs when starts with 'patients/' 
  res.locals.patientPrefix="/patients";
  next();
})
app.use("/patients",patientRouter)

 
app.listen(3000)