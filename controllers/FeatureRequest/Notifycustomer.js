import { adminperson, customerlist, io } from "../../index.js";

export const Notifycustomer = (req,res) => {
  console.log("Notify orderid:",req.query.orderid);
  var reqested_id = req.query.orderid
  customerlist.forEach(element => {
    console.log("Element inside:",element);
    var orderid = element.Orderid
    var linkid = element.Linkid;
    if(reqested_id===orderid){
        io.to(linkid).emit('hello','for your eyes only',()=>{
            console.log("notified customer..");
        })
    }else{
        console.log("Orderid not found!");
        
    }
  });
//   console.log(`Link id of order id - ${req.query.orderid} is ${linkid}`);
res.sendStatus(200)
}