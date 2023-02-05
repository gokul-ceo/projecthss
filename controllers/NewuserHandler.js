import { generateAccessToken } from "../worker.js";

export const NewUserHandler = async(req,res)=>{
    const id = req.params.customerid;
    const name = req.body.name;
    const number =req.body.phone
    console.log("New customer...............");
    console.log("Name: ",name);
    console.log("Phone: ",number);
    console.log("Customer id: ",id);
    if((number!==null||number!=='null') && (name!==null||name!=='null') && (id!==null || id!=='null')){
      var token = generateAccessToken(name,number,id)
      res.json(token)
    }else{
      console.log("Some null values recived while handling new user!");
    }

    // update_customer(name,number,id)
    // .then(console.log("New customer  is registed successfully!!"))
    // res.cookie("customerid",id)
    // console.log("New registered user!");
    // console.log("customername: ",req.body.customername);
    // console.log("customermobilenumber: ",req.body.customernumber);
  // console.log("username: ",req.body.username);
  // if(req.body.username!== undefined){
  //   const token=generateAccessToken({username:req.body.username});
  //   res.json({ accessToken: token})
  //   console.log("Generated token: ",token);

  // }
  // console.log("Customer_id:  ",customer_details.customerid);
  // res.sendStatus(200)
}