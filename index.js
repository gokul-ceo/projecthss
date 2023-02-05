import  express from "express";
import bodyparser from "body-parser";
import { senddata } from "./controllers/UpdatetoDatabase.js";
import { getdata } from "./controllers/getdata.js";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import './auth/googleauth.js'
import cors from "cors"
import { createServer } from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { senddetails } from "./controllers/Updatedetails.js";
import * as dotenv from 'dotenv';
import { changehandler } from "./controllers/changehandler.js";
import { Availablity_checker } from "./controllers/Availability_checker.js";
import { GenerateAdminToken, autheticateToken, verifyavailabilty } from "./worker.js";
import { NewUserHandler } from "./controllers/NewuserHandler.js";
import { CheckOutHandler } from "./controllers/checkoutcontroller.js";
import { Orderdetailshandler } from "./controllers/Orderdetailshandler.js";
import { Orderhandler } from "./controllers/Ordershandler.js";
import { Getcatagories } from "./controllers/Getcatagories.js";
import { Vendorhandler } from "./controllers/Accounts/Vendorhandler.js";
import { Vendorsmanager } from "./controllers/Accounts/Vendorsmanager.js";
import { Vendordata } from "./controllers/Accounts/Vendordata.js";
import { Verifyauthuser } from "./middleware/Verifyauthuser.js";
import { EmployeeManager } from "./controllers/Employees/Employeemanager.js";
import { EmployeeDetailsmanager } from "./controllers/Employees/EmployeedetailsSender.js";
import { Presentemployee } from "./controllers/Employees/Presentemployee.js";
import { Updatemenucollection } from "./controllers/Admin/Updatemenucollection.js";
import { MenutoPos } from "./controllers/Pos_send.js";
import { totalemployee } from "./controllers/FeatureRequest/Totalemploye.js";
import { likehandler } from "./controllers/likehandler.js";
import { CustomerCheckout } from "./controllers/FeatureRequest/Checkouthandler.js";
import { Recentorderhandler } from "./controllers/FeatureRequest/Recentorder.js";
import { Menu } from "./controllers/Menu.js";
import { Notifycustomer } from "./controllers/FeatureRequest/Notifycustomer.js";
// import { Updatenewbalance } from "./middleware/Updateoldbalance.js";
dotenv.config()
const app = express()
export var customerlist = []
export var customercount = 0;
// var whitelist = ['http://localhost:3000', 'http://localhost:5000  ']
const corsOptions ={
    origin: ["http://localhost:3000","http://localhost:5000"],
    credentials:true,             
    // optionSuccessStatus:200
}

var whitelist = ['http://localhost:3000', 'http://localhost:5000']
app.use(cors(corsOptions));
app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}))
app.use(passport.initialize()) // init passport on every route call
app.use(passport.session()) 
// app.use(cors());
const httpServer = createServer(app);
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));
app.get("/login/success",Verifyauthuser,(req,res)=>{
  
  if(req.user){
    var Token =  GenerateAdminToken(req.user._json.name,req.user.email,'staff')
    //  console.log("Token generated:",Token);
    // console.log("Details sent:",req.user._json.name,req.user.picture)
    // console.log("User:",req.user);
    res.json({
      name:req.user._json.name,
      img:req.user.picture,
      token:Token,
      role:'owner'
    })
    // console.log("Result:",req.user._json);
  }
  // console.log("User loggin:",req.user);
})
app.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: 'http://localhost:5000/',
        failureRedirect: '/login'
}));

export const io = new Server(httpServer, { 
    cors: {
        origin:"https://admin.socket.io/"
    }
});
instrument(io, {
  auth:false
});
var port = process.env.PORT || 4000;
mongoose.connect(`mongodb+srv://gokul_g:rzihq1iiSgWlUlHd@hssbase-main.54opb82.mongodb.net/hss-main-base(testing)`,()=>{
  console.log('Database is connected!');
})


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}));
app.post('/',senddata)
app.get('/data',getdata)
app.post('/senddetails',senddetails)
app.get('/updatecollection',Updatemenucollection)
app.post('/hsscheckout',autheticateToken,CheckOutHandler)
app.get('/recievedorders',Orderhandler)
app.post('/changethisitem',changehandler)
app.get("/orderdetails/:orderid",Orderdetailshandler)
app.post('/api/registercustomer/:customerid',NewUserHandler)
app.get('/pos/menulist/:substring',MenutoPos)
app.get('/customer/menu',Menu)
app.get("/admindata/availablemenuitems",Availablity_checker)
app.get("/testroute",Getcatagories)
app.post("/addvendor",Vendorhandler)
app.get("/vendors/:vendorname",Vendorsmanager)
app.post("/vendordata",Vendordata);
app.post('/employee/data',EmployeeManager);
app.get('/employeedetails/all',EmployeeDetailsmanager);
app.get('/presentemployees',Presentemployee)
app.get('/getcount',totalemployee)
app.post('/like',likehandler)
app.get('/checkout/orderdetails/:orderid',CustomerCheckout)
app.get('/feature/recentorders',Recentorderhandler)
app.post('/customer/notify',Notifycustomer)
// app.get('/employee')
// app.post('/employeestatus')
app.get('/isserverworking',(req,res)=>{
  res.json("working fine!!...")
})
// app.listen({port},(()=>{console.log('server is running on:', port)}))

 
// SOCKET CODE...
export const adminperson = io.of("/admin");
export const customersocket = io.of('/')
export const ordersocket = io.of("/notify")
adminperson.use((socket,next)=>{
  next()
})
ordersocket.use((socket,next)=>{
  next()
})
ordersocket.on("connection",socket=>{
  console.log("Current order tab is connected and opened!..");
});
ordersocket.on("seeninfo",(orderid)=>{
  console.log("Adming has seen order:",orderid);
})
adminperson.on("connection",socket=>{
  console.log("Admin has connnected!! be carefull");

  adminperson.on('updateitem',(message)=>{
    console.log('Message : ',message);
  });


});

io.on("connection", async (socket) => {
    console.log("User connected: ",socket.id);
    customercount += 1;
    console.log(`Number of connected customers is ${customercount}`);
    adminperson.emit('testing',socket.id)
    socket.on("disconnect",(reason)=>{
      customercount -=  1;
      console.log(`Number of connected customers is ${customercount}`);
      console.log("User with had left because of ",reason);
      adminperson.emit("disconnectnews",'A user left order in halfway! :( ')
   
    });
    
      // export const notify = (linkid) =>{
      //   socket.to(linkid).emit('hello','for your eyes only!')
      // }
    // socket.emit("menulist",menu);
    socket.on("handlecheckout",(arg)=>{
      var tableno  = Math.floor(Math.random()*20) //for testing.... should be removed in production
      // console.log("Tableno: ",tableno);
      const response = make_arrangements_to_sent(tableno,make_meaningful(arg));
      adminperson.emit('recievedorder',response[0])
      
      // make_meaningful(arg) 
      console.log("Order that have been sent to admin: ",arg); 
      // Update_order(arg)
      var order_id = generate_order_id()
      Update_order(arg,order_id)
      console.log("Order_id: ",order_id);
      const date = new Date();
      var TimeStamp = date[Symbol.toPrimitive]('number')
      // for(let i =0 ;i<arg.length;i++){
      //   console.log("Value: ",arg[i]);
      // }
      const orderformat = {
        billno:'hss123',
        customername:'Gokul',
        customernumber:9600399223,
        timestamp:TimeStamp,
        orderid:order_id
      } 
      arg.forEach(element => {
        console.log("Name: ",element.Name);
        var Name = element.Name;
        var Quantity = element.Quantity;
        var Price = element.Price;
        const orderDetails = {
          Name:Name,
          Quantity:Quantity,
          Price:Price,
          Orderid:order_id,
          Orderfromcustomerid:'64323424'
        }
        const neworder_detail = new OrderDetails(orderDetails)
        neworder_detail.save(function(err){
          if(!err){
            console.log("saved an order");
          }else{
            console.log("error occured while saving order!! :( ");
            console.log("Error message: ",err.message);
          }
        })
  
      });
      
      const incoming_order = new Neworder(orderformat)
      incoming_order.save(function(err){
        if(!err){
            console.log("Order saved successfully!!");
        }else{
            console.log("Something went wrong while saving the order :(");
            console.log("Error message: ",err.message);
        }
    }) 
    // const toadmin_obj = {
    //   order_recived:arg,
    //   orderid:order_id,
    //   customer_id:
    // }
      // arg.forEach(element => {
      //   console.log("Element in orders arrray: ",element.ITEM);
      // });
      // adminperson.emit('recievedorder',arg)
    }); 
    socket.on("verifyitem",async (item)=>{
      var name = item.toLowerCase()
      verifyavailabilty(name)
      .then((result)=>{
      console.log(`${item} availability is ${result}`);
      var verify_result_obj = {
        Itemname:name,
        Available:result
      }
       io.sockets.emit("verificationresult",verify_result_obj,()=>{
        console.log("verification result has been sent..");
      })
      })
      .catch((err)=>{
        console.log("Error has been occured!! : ",err);
      })
      // var result = await verifyavailabilty(name)
      // var result =  verifyavailabilty(name).then(()=>{console.log("verification result: ",result);})
      // console.log("");
     
  
    });
    socket.on("loadevent",(message)=>{
      console.log(message);
    });
    socket.on('introduceme',(message)=>{
    console.log("Message recieved from client while connecting: ",message);
    });
    // function sendorder(orders){
    //   socket.emit('orders',orders,()=>{
    //     console.log("orders has been sent...to adim!");
    //   })
    // }
   
    // return all Socket instances of the main namespace
  
    // adminperson.on('updateitem',(item)=>{
    //   console.log("Updateitem: ",item);
    //   // socket.emit('updateitem',item)
    // });
  
  });

   adminperson.on('hello',(message)=>{
    console.log("Admin message:",message);
   })
  httpServer.listen({port},()=>{
    console.log("server is running on: ",port);
  })