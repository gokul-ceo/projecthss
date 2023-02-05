import mongoose from "mongoose";
const VendorNamesSchema = new mongoose.Schema({
    Vendorname:String,
    Vendorbalance:Number,
})
const Vendornames = mongoose.model('Vendorname',VendorNamesSchema);
export default Vendornames;