import mongoose from "mongoose";

const neworder = new mongoose.Schema({
    billno:Number,
    customername:String,
    customernumber:Number,
    timestamp:Number,
    orderid:String,
    orderstatus:String,
    paymentstatus:String,
    paymentmode:String,
    paymenttime:Number,
    ordertype:String  

},{typeKey:'$type'})
const Neworder = mongoose.model('NewOrder',neworder)
export default Neworder