import OrderDetails from "../model/orderitem_details.js";

export const Orderdetailshandler = async (req,res)=>{
    var orderid = req.params.orderid;
    console.log("Order details is requested for ordernumer-",orderid);
    // OrderFetch(orderid)
    await OrderDetails.find({Orderid:orderid,},function(err,result){
        if(!err){
            // console.log("Orderdetails result: ",result);
            res.json(result)
        }
        else{
            console.log("Error occured in find orderid...! :( ");
            res.sendStatus(500)

        }
    }).select('Name Orderid Orderfromcustomerid Quantity -_id')
    .clone().catch((err)=>{console.log("Error in orderdetailshandler() : ",err);})

}