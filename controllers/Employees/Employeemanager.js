import EmpUpdate from "../../model/EmpSalary&attendance.js";
import Newemployee from "../../model/EmployeeNames.js";
import { Formatdate, GenerateEmpid, Gettodaysdate } from "../../worker.js";

export const EmployeeManager = async (req,res) => {
    if(req.query.operation==='add'){
        console.log("Body:",req.body);
        var empid = GenerateEmpid()
        var empobj = {
            Empname:req.body.name,
            Empdoj:Date.now(),
            Empid:empid,
            Empmobile:req.body.number,
            Empgender:req.body.gender,
            Empaadhar:req.body.aadhar,
            Empjobrole:req.body.role,
            Empaddress:req.body.address,
            Status:'working'
        }
        var newemployee = Newemployee(empobj)
        await newemployee.save(function(err){
            if(!err){
                console.log("New employee details saved");
        res.sendStatus(200)
            }else{
                res.sendStatus(404)
            }
        })
    }
    else if (req.query.operation === 'update'){
        console.log("Query is to update the emp..");
        // console.log("Request body:",req.body);
        var today = Gettodaysdate()
        var empid;
        await Newemployee.findOne({Empname:req.query.empname},function(err,result){
            if(!err){
                // console.log(`${req.query.empname} id is ${result.Empid}`);
                if(result!==undefined){
                    empid = result.Empid
                }else{
                    console.log("Result is undefined!");
                }

            }else{
                console.log(`Something went wrong while finding empid of ${req.query.empname}`);
            }
        }).select('Empid -_id').clone().catch((err)=>{console.log("Error in f ",err);})
        var obj = {
            Empname:req.query.empname,
            Empid:empid,
            Date:today,
            Empattendance:'Present',
            SalaryType:'Daily',
            Salary:0,
            Finance:false
        }
        const Updateemp = EmpUpdate(obj)
        await Updateemp.save((err)=>{
            if (!err) console.log("Emp updated successfully");
            else console.log("Something went wrong while updating!");
        })
        console.log("Query is to update emp:",req.query.empname);
        res.sendStatus(200)
    }

} 