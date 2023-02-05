import mongoose from "mongoose";
const EmployeeSchema = new mongoose.Schema({
    Empname:String,
    Empdoj:Number,
    Empid:String,
    Empmobile:Number,
    Empgender:String,
    Empaadhar:Number,
    Empjobrole:String,
    Empaddress:String,
    Status:String,

})
const Newemployee = mongoose.model("Employees",EmployeeSchema);
export default Newemployee;