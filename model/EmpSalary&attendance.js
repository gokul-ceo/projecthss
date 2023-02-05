import mongoose from "mongoose";
const EmpSASchema = new mongoose.Schema({
    Empname:String,
    Empid:String,
    Date:String,
    Empattendance:String,
    SalaryType:String,
    Salary:Number,
    Finance:Boolean

})
const EmpUpdate = mongoose.model("Employee_Salary_details",EmpSASchema);
export default EmpUpdate;