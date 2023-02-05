import { Gettodaysdate } from "../../worker.js";
import EmpUpdate from "../../model/EmpSalary&attendance.js";
export const Presentemployee = async(req,res)=>{
    var today = Gettodaysdate();
    var result = Promise.resolve(
        await EmpUpdate.find({Date:today},function(err,result){
            if(!err && result!==undefined ){
            // res.json(result)
            return result
            }else{
            console.log("Something has went wrong or result may be undefined..");
            res.sentStatus(404)
            }
        }).select('Empname Empid Empattendance -_id').clone().catch((err)=>{console.log("Error in finding the present employees"),console.log("Error:",err)})
    )
    result.then((value)=>{
        console.log("Value of the promise:",value);
    })
 

}