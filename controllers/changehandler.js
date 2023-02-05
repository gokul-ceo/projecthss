import { customercount } from "../index.js";
import { adminperson } from "../index.js";
import { updatethechanges } from "../worker.js";
import { io } from "../index.js";

export const changehandler = async (req,res)=>{
    
    if(customercount!==0 && req.body.Available !== false){
        updatethechanges(req.body.Item,req.body.Available,req.body.Price,req.body.Quantity)
        .then(()=>{
        res.sendStatus(200)
        })
        .catch((err)=>{
          console.log("Error occur in /changethisitem router!! see to  that...");
        })
        io.sockets.emit("changeoccured",(req.body),()=>{
          console.log("change has been notified to the customers!!! :) ");
        })
      }else if (customercount === 0 || req.body.Available === true){
        updatethechanges(req.body.Item,req.body.Available,req.body.Price,req.body.Quantity)
        .then(()=>{
        res.sendStatus(200)
        })
        .catch((err)=>{
          console.log("Error occur in /changethisitem router!! see to  that...");
        })
        io.sockets.emit("changeoccured",(req.body),()=>{
          console.log("change has been notified to the customers!!! :) ");
        })
      }
      else{
        console.log("Customer is there.. we can't make sudden change!!");
        adminperson.emit("change_warning",true,()=>{
          console.log("Warned the admin!");
        })
      }
      // res.sendStatus(200)
}