import Neworder from "../model/order_info.js";

export const Orderhandler = async(req,res)=>{
    var pendingorders = []
    await Neworder.find({orderstatus:"created"},function(err,result){
        if(!err){
            // console.log("recived order id details result: ",result);
            // res.json(result)
            result.forEach(element => {
                pendingorders.push(element.orderid)
            });
        }
        else{
            console.log("Error occured in find orderid...! :( ");
            res.sendStatus(500)

        }
    }).select('-_id')
    .clone().catch((err)=>{console.log("Error in orderdetailshandler() : ",err);})
    // console.log("pending orders array: ",pendingorders);
    res.json(pendingorders)
}