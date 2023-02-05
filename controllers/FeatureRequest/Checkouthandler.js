import OrderDetails from "../../model/orderitem_details.js";
export const CustomerCheckout = async(req,res) => {
    var orderid = req.params.orderid;
    var socketid = req.query.linkid;
    console.log("Customer checkedout from socket id:",socketid);
    var Orderlist = Promise.resolve(
        await OrderDetails.find({Orderid:orderid},function(err,result){
            if(!err){
                return result
            }else{
                console.log("something went erorr...while collecting orderdetails..");
            }
        }).select('-_id').clone().catch((err)=>{console.log("Error collecting orderdetails..",err);})
    )
    Orderlist.then((result)=>{
        res.json(result)
    })
}