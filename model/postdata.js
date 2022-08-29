import mongoose from "mongoose";

const postdata = new mongoose.Schema({
    title:String,
    amount:Number,
    type:String,
    Date:String,
    time:String
})

const PostData = mongoose.model('PostData',postdata);

export default PostData;
