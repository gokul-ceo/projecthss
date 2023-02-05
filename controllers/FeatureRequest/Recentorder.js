import Neworder from "../../model/order_info.js"

export const Recentorderhandler = async(req,res)=>{
    var recentorders = Promise.resolve(
        await Neworder.find({orderstatus:'created'},function(err,result){
            if(!err){
                return result
            }else{
                console.log("Something went wrong while collecting recent orders.. :( ");
            }
        }).select('orderid timestamp -_id').clone().catch((err)=>{console.log("Error: ",err);})
    )
    recentorders.then((result)=>{
        res.json(result)
    })
}
