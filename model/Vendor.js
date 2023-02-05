import mongoose from "mongoose";
const VendorSchema = new mongoose.Schema({
    Vendorname:String,
    // Frequency:String,
    Balance:Number,
    Addedat:String,
    Billdate:String,
    Billamount:Number,
    Totalbalance:Number,
    Paidamout:Number,
    FinalBalance:Number,
    timestamp:Number
    
    // temproray:{
    //     type:Boolean,
    //     default:false
    // }
})
const Vendors = mongoose.model('Vendor',VendorSchema);
export default Vendors;