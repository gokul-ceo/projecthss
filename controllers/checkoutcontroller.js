//this handler need the customer id as a params....

// import { Socket } from "socket.io";
import { adminperson, customerlist, io } from "../index.js";
import Neworder from "../model/order_info.js";
// import { customersocket } from "../index.js";
import { CreateOrder, } from "../worker.js";

export const CheckOutHandler = async(req,res)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const Linkid = req.query.linkid;
    console.log("Customer order from :",Linkid);
    // console.log("Verification done!!"); 
    // console.log("Items recived from client: ",req.body);
    // console.log("Cookie: ",req.cookies);
    var orderlist = req.body;
    var orderid =  await CreateOrder(orderlist,token)
    console.log("Created order with orderid-",orderid);
    adminperson.emit("orderarrived",orderid,()=>{
        console.log("Order id has been sent to admin..");
    })
    customerlist.push({
        "Orderid":orderid,
        "Linkid":Linkid
    })
    var timestamp = Date.now()
    console.log("Customerlist:",customerlist);
    adminperson.emit('neworder',{timestamp,orderid},()=>{
        console.log("timestamp is sent to feature request!");
    })

    // orderlist.forEach(async element => {
    //     console.log("Items inside order list: ",element);
    //     console.log("Item name: ",element.Name);
    //     console.log("Item quantity: ",element.Quantity);
    //     var orderid = await CreateOrder(orderlist,token)
    //     console.log("Created order with orderid-",orderid);
    //     // UpdateOrder(element.Name,element.Quantity)
    // });
    // send
    // adminperson.emit('orders',orderlist,()=>{
    //     console.log("order sent to admin!!!!........");
    // })

    res.json(orderid)
    // res.json("checkout done..!")
  
}