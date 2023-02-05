import mongoose from "mongoose";

const customer_schemas = new mongoose.Schema({
    name:String,
    number:Number,
    customerid:String
})


const newcustomer = mongoose.model('Customers',customer_schemas)
export default newcustomer;