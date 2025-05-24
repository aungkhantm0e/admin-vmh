const Patient=require("../models/patient");

//fetch all patient data
exports.indexPage=(async (req,res)=>{
    try{
        const patients = await Patient.find({});
        const count=await Patient.countDocuments();

        //Prepare chartData from the patient data
        const chartData=patients.map(p=>{
            const name=p.response.find(r=> r.question === "name")?.response || "Unkown";
         
            const rawDate = p?.session_info?.session_end;
            let date = "N/A";

            if (rawDate) {
                try {
                    const parsedDate = new Date(rawDate);
                    date = parsedDate.toISOString().split("T")[0];
                } catch (err) {
                    console.warn("Invalid date for patient:", name);
                }
            }
            
            return{
                name,
                date,
                responseCount: p.response?.length || 0
            }

        })

        res.render("index",{patients,chartData,count});
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
})