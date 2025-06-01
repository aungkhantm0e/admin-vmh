const Patient=require("../models/patient");

//fetch all patient data
exports.indexPage=(async (req,res)=>{
    try{
        const allpatients = await Patient.find({});
        const fewPatients= await Patient.find({}).limit(5);
        const count=await Patient.countDocuments();

        //--------- LINE CHART----------------------
        const dateCounts={};
        allpatients.forEach(p=>{
            const rawDate=p?.session_info?.session_end;
            if(rawDate){
                const date=new Date(rawDate).toISOString().split("T")[0];//e.g. "2024-05-30"
                dateCounts[date]=(dateCounts[date] || 0)+1;
            }
        });      
        //Prepare chartData for chart
        const chartData=Object.entries(dateCounts).map(([date,count])=>({
            date,
            patientCount:count
        })).sort((a,b)=>new Date(a.date)-new Date(b.date)); //Sort by date

        //------------ Gender Pie Chart-----------------------------------
        let maleCount=0;
        let femaleCount=0;

        allpatients.forEach(p=>{
            const gender=p.response.find(r=>r.question==="gender")?.response?.toLowerCase();
            if(gender==="male")maleCount++;         
            else if (gender==="female")femaleCount++;
        });

        const genderPieData={
            labels:["Male","Female"],
            data:[maleCount,femaleCount]
        }

        res.render("index",{allpatients,fewPatients,chartData,count,genderPieData});
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
})