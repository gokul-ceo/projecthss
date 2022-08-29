import mongoose from "mongoose";

const CrediDebitTable = new mongoose.Schema({
        date:String,
        credit:Number,
        debit:Number
});

const updateamount = mongoose.model('updateamount',CrediDebitTable)
export default updateamount;