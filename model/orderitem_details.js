import mongoose from "mongoose";
const order_details_Schema = new mongoose.Schema({
    Name:String,
    Quantity:Number,
    Price:Number,
    Orderid:String,
    Orderfromcustomerid:String
})

const OrderDetails = mongoose.model("order_details",order_details_Schema)
export default OrderDetails;