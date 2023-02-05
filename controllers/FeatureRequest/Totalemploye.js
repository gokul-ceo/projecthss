import EmpUpdate from '../../model/EmpSalary&attendance.js';
import { Gettodaysdate } from '../../worker.js';
export const totalemployee = async(req,res)=>{
    var today = Gettodaysdate();
    var result = Promise.resolve(
        EmpUpdate.countDocuments({Date:today},function(err,result){
            if(!err){
                return result
             
            }
            else{
                console.log("Something went wrong while counting the documents!!.. :( ");
            }
        }).clone().catch((err)=>{console.log("Error in generatebillnumber() : ",err);})
    ) 
    result.then((value)=>{
        res.json(value)
    })


}