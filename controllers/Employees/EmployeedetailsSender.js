import Newemployee from "../../model/EmployeeNames.js"

export const EmployeeDetailsmanager = async(req,res) =>{
    await Newemployee.find({},function(err,result){
        if(!err){
            res.json(result)
        }else{
            console.log("Something went wrong in employee details sender.js");
            res.sendStatus(404);
        }
    }).select('Empname Empgender Empid Empjobrole -_id').clone().catch((err)=>{console.log("Error in employee details sender.js : ",err);})
}