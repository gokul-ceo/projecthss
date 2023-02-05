import updateMenuitem from "../model/updatemenuitem.js";

export const likehandler = (req,res)=>{
    console.log("Query:",req.query.itemname);
    console.log("Query by:",req.query.customerid);
    var item = Promise.resolve(
      updateMenuitem.findOneAndUpdate({Item:req.query.itemname},{ $push:{Ratedcustomer:req.query.customerid}}).exec()
    )
    item.then(()=>{
        console.log("Item updated successfully!");
    })
   
}