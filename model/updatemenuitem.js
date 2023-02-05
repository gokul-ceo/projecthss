import mongoose from "mongoose";

const updateMenu = new mongoose.Schema({
    Item: String,
    Available:Boolean,
    Quantity:Number,
    Price:Number,
    Type:String,
    Rating:Number,
    Ratedcustomer:[String],
    Lastupdated:Number
})


const updateMenuitem = mongoose.model('Menu',updateMenu)
export default updateMenuitem