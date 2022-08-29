import mongoose from "mongoose";

const BalanceSchema = new mongoose.Schema({
    titel:String({
        date:String,
        Balance:Number,
        
    })
})

const Balance = mongoose.model('Balance',BalanceSchema);
export default Balance;