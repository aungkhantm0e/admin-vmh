const express=require("express");
const mongoose = require('mongoose');
const userRoutes=require("./routes/user")
const loginRoutes=require("./routes/login")
const indexRoutes=require("./routes/home")
const questionRoutes=require("./routes/question")
const {isAuthenticated}=require("./controllers/auth")
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
  if(req.session.user){
    res.locals.userid=req.session.user.id;
    res.locals.role=req.session.user.role; 
    res.locals.username=req.session.user.name;
  }else{
    res.locals.userid=null,
    res.locals.role=null
  }
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


//---------------LOGIN-----------------
//Login routes
app.use(loginRoutes)
//---------------User creation-----------------
app.use(userRoutes)

app.use(isAuthenticated);

//---------------HOME----------------
//Home routes
app.use(indexRoutes)

//--------------Questions--------------
app.use(questionRoutes)

//--------------PATIENT-----------------
//Patient's routes
const patientRouter=require("./routes/patients")
app.use("/patients",(req,res,next)=>{     //this middlware only runs when starts with 'patients/' 
  res.locals.patientPrefix="/patients";
  next();
})
app.use("/patients",patientRouter)

 
app.listen(3000)