import updateMenuitem from "../model/updatemenuitem.js";
export const Availablity_checker = async(req,res)=>{
    var socketid =  req.query.linkid
    console.log("User requested menu from socketid -",socketid);
    
    updateMenuitem.find({}).select('Item Available Lastupdated  Quantity Price -_id').exec()
    .then((result)=>{
        // console.log("Avaialbility status: ",result);  //for dev testing.... need to be cleared
        res.json(result)
        // console.log("Result: ",result);
    })
    .catch((err)=>{
        console.log("Error has been occured!");
        res.sendStatus(401)
    })
    // res.sendStatus(200)
}