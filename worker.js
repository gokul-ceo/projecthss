import newcustomer from "./model/Addcustomer.js";
import updateMenuitem from "./model/updatemenuitem.js";
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode'
import { io } from "./index.js";
import Neworder from "./model/order_info.js";
import OrderDetails from "./model/orderitem_details.js";
import Vendors from "./model/Vendor.js";
var CUSTOMER_SOCKETID = []
export async function UPDATE_MENU_STATUS(){
     var reponselist = Promise.resolve(
        await updateMenuitem.updateMany({},{Available:false,Lastupdated:Date.now()},function(err,result){
        if(!err){
            return result
        }else{
            console.log("something went wrong while updateing menu status..");
        }
     }).where('Quantity').lt(3).select('Item -_id').clone().catch((err)=>{console.log("Error: ",err);})
     )
     var response_list_true = Promise.resolve(
        await updateMenuitem.updateMany({},{Available:true,Lastupdated:Date.now()},function(err,result){
            if(!err){
                return result
            }else{
                console.log("Something went wrong while updating the menu status as true.!");
            }
        }).where('Quantity').gt(3).clone().catch((err)=>{console.log("Error: ",err);})
     )
    //  reponselist.then(async (result)=>{
    //     console.log("Updated all documents!");
    //  })
}
export function make_meaningful(array){
    var current_orderitem=[]
    array.forEach(element => {
        // console.log(element);
        // const itemarray = element.ITEM;
        // console.log("ITEM array: ",itemarray);
        var name = element.Name
        var quantity = element.Quantity
        current_orderitem.push({name,quantity})
        // console.log("Name: ",itemarray.Name);
        // console.log("Quantity: ",itemarray.Quantity);
        // console.log("ITEM array lenght: ",itemarray.length);  undefined
    });
    // console.log("value in array: ",current_orderitem);
    return current_orderitem
}

export function make_arrangements_to_sent(Tableno,array){
    var to_send = []
    to_send.push(Tableno,array)
    // console.log("To send: ",to_send);
    return to_send;
}

export async function update_available_item(item){
    console.log("TEsint the body: ",item);
    const newmenuitem = new updateMenuitem(item)
    newmenuitem.save(function(err){
        if(!err){
            // console.log("Item saved successfully!!");
        }else{
            console.log("Something went wrong :(");
            console.log("Error message: ",err.message);
        }
    })
    // const newMEnuitem = new updateMenuitem()
        // for(let i=0;i<array.length;i++){
        //     console.log("Items avalibale: ",array[i]);
        //     // await updateMenuitem(array[i])
        //     var item = array[i]
        //     const newMenuitem = new updateMenuitem()
        //     newMenuitem.save(function(err){
        //         if(!err){
        //             console.log("New menu item has been updated!!");
        //         }else{
        //             console.log("Oopps something went wrong");
        //             console.log("Errro message: ",err.message);
        //         }
        //     })
        //     // const newitem = new updateMenuitem(Item:)
        //     // newitem.save()
        // }
        // // const newitem = new updateMenuitem(array)
        // // newitem.updatemany
        
    
  
    
}
export function generate_order_id(){
    var orderid = ''
    var layer1 = Math.floor(Math.random()*9999)
    layer1 = String(layer1)
    switch (layer1.length) {
        case 1:
            orderid = "Hss000"+layer1
            console.log("Case1: ",orderid);
            break;
        case 2:
            orderid = "Hss00"+layer1
            console.log("Case2: ",orderid);
            break;
        case 3:
            orderid = "Hss0"+layer1
            console.log("Case3: ",orderid);
            break
        default:
            orderid = "Hss"+layer1
            console.log("Case default: ",orderid);
            break;
    }
    return orderid;
}

export async function Update_order(array,orderid){
  
    array.forEach(element => {
        // console.log("Foreach value: ",element);
    });
}

export const update_customer = async(name,number,id)=>{
    const customer_obj = {
        name:name,
        number:number,
        customerid:id
    }
    const Newcustomer = new newcustomer(customer_obj)
     Newcustomer.save((err) =>{
        if(!err){
            console.log("Customer has been registered successfully!!");
        }else{
            console.log("Could'nt register this customer :( ");
            console.log("Error message: ",err.message);
        }

    })

}

export async function verifycustomer(req,res,next){
    console.log("customer id: ",req.params.customerid);
    console.log("customer is verified !!");
    next()
}
export function autheticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    // console.log("authHeader: ",authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    // console.log("Token: ",token);
    var decoded = jwt_decode(token)
    // console.log("Decoded version of jwt: ",decoded);
    if (token === null)  return res.sendStatus(401)
    else{
        jwt.verify(token,process.env.SECRET,(err,user)=>{
            if(!err){
            next()
            }else{
                res.sendStatus(401)
            }
            // console.log("Error: ",err);
            // console.log("Error msg: ",err.message);
            // if(err) return res.sendStatus(403)
            // if(err.message==="jwt expired"){
            //     res.send("Your Token is expired!")
            // }
            // console.log("req.user: ",user);
        })
    }
   
}
export function GenerateAdminToken(name,email,role){
    const Admin={
        Name:name,
        Email:email,
        Role:role
    }
    if(Admin.Name!==null && Admin.Email!==null){
        return jwt.sign(Admin,process.env.ADMIN_SECRECT,{expiresIn:'30000s'});
        }else{
            console.log("Token we not be generated for null values!!....");
        }
};
export function GetRole(token){
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    var decoded = jwt_decode(token)
    if (token === null || token === '') {console.log("Token value is null! @GetRole");}
    else{
        console.log("Decoded:",decoded);
        return decoded.Role
        // jwt.verify(token,process.env.SECRET,(err,user)=>{
        //     if(!err){
        //     next()
        //     }else{
        //         res.sendStatus(401)
        //     }
        // })
    }
     
}
export function generateAccessToken(username,phonenumber,customerid){
    const customerdetails = {
        Customername:username,
        Customernumber:phonenumber,
        Customerid:customerid
    }
    if(customerdetails.Customername!==null && customerdetails.Customernumber!==null && (customerdetails.Customerid!==null||customerdetails.Customerid!=='null')){
    return jwt.sign(customerdetails,process.env.SECRET,{expiresIn:'30000s'});
    }else{
        console.log("Token we not be generated for null values!!....");
    }
}

export const verifyavailabilty = async(itemname)=>{
        var verificationresult;
        await updateMenuitem.find({Item:itemname},function(err,result){
            if(!err){
                var resultarray = result[0];
                if(resultarray!==undefined){
                // console.log("Result: ",resultarray.Available);
                verificationresult = resultarray.Available
                }
                
            }else{
                console.log("Something went wrong while verifying the availablity! :(  ");
            }
        }).clone().catch((err)=>{console.log("Error: ",err);})

//    console.log("REsult outside: ",verificationresult);
   return verificationresult
}

export const updatethechanges= async(itemname,availablity_status,price,quantity)=>{
    await updateMenuitem.updateOne({Item:itemname},{Available:availablity_status,Lastupdated:Date.now(),Price:price,Quantity:quantity},function(err,result){
        if(!err){
            console.log("Updated: ",result);
        }else{
            console.log("Something went wrong while updating the changes");
        }
    })
}
export const quantity_updater = async(itemname,quantity)=>{

}
// export const quantity_finder = async(itemname)=>{
//     var currentquantity = 0;
//     await updateMenuitem.find({Item:itemname},function(err,result){
//         if(!err){
//             var resultarray = result[0];
//             console.log("Resultarray: ",resultarray);
//             console.log("Resultarray quantity: ",resultarray.Quantity);
//             if(resultarray!==undefined){
//                 // currentquantity += Number(resultarray.Quantity); 
//             // console.log("Resultarray quantity: ",resultarray.Quantity);
//             return resultarray.Quantity
//             }else{
//                 console.log("Something went wrong while getting quantity in quantity_finder().");
//             }
//         }
//     }).clone().catch((err)=>{console.log("Error: ",err);})
//     // console.log("value of currentquantity :",currentquantity);
//     if(currentquantity!== undefined){
//     // return currentquantity;
//     }else{
//         console.log( `We don't know what happend, but the current quantity seems to be undefined!.`)
//     }
// }
export const UpdateItemQuantity = async(itemname,quantity)=>{
    // console.log("Item came to update order: ",itemname);
    var ItemName = itemname.toLowerCase()
    console.log("Lower case version of item - ",ItemName);
    var currentquantity = undefined;
    var req_q = quantity;                                   // (reqested quantity)
    while (currentquantity===undefined) {
        await updateMenuitem.find({Item:ItemName},function(err,result){
            if(!err){
                var resultarray = result[0];
                if(resultarray!==undefined){
                currentquantity = resultarray.Quantity;
                }else{
                    console.log("Something went wrong while getting quantity in quantity_finder().");
                }
            }
        }).clone().catch((err)=>{console.log("Error: ",err);})  
    }
    console.log("Quantity in database = ",currentquantity);
    console.log("Reqested quantity = ",req_q);
    // console.log("New quantity to save in database = ",currentquantity - req_q);
    var newquantity = currentquantity - req_q;
    if(newquantity<0){
        console.log("Availablity...needs to be changed here!!..");
        console.log("This item order cannot be taken..because it is not available!");
    }else{
        await updateMenuitem.updateOne({Item:ItemName},{Lastupdated:Date.now(),Quantity:newquantity},function(err,result){
            if(!err){
                console.log("Updated: ",result);
                console.log('Quantity has been updated..!');
            }else{
                console.log("Something went wrong while updating the changes");
            }
        }).clone().catch((err)=>{console.log("Error: ",err);})
    }
}
export async function GenerateBillNumber(){
    var totalbill
    return new Promise((resolve,reject)=>{
        resolve(
            Neworder.countDocuments({},function(err,result){
                if(!err){
                    // console.log("Total number of order: ",result);
                    totalbill = Number(result);
                }
                else{
                    console.log("Something went wrong while counting the documents!!.. :( ");
                }
            }).clone().catch((err)=>{console.log("Error in generatebillnumber() : ",err);}))
    })
    // // var totalbill;
    // Neworder.countDocuments({},function(err,result){
    //     if(!err){
    //         console.log("Total number of order: ",result);
    //         totalbill = Number(result);
    //     }
    //     else{
    //         console.log("Something went wrong while counting the documents!!.. :( ");
    //     }
    // }).clone().catch((err)=>{console.log("Error in generatebillnumber() : ",err);})
    // return totalbill
}

export async function CreateOrder(orderarray,token){
    var customerdetails = jwt_decode(token)
    var Order_array = orderarray;
    var orderid = generate_order_id();
    var totalbill = 1010;
        // Neworder.countDocuments({},function(err,result){
        //     if(!err){
        //         console.log("Total number of order: ",result);
        //         totalbill = Number(result);
        //     }
        //     else{
        //         console.log("Something went wrong while counting the documents!!.. :( ");
        //     }
        // }).clone().catch((err)=>{console.log("Error in generatebillnumber() : ",err);})
    
    
    // console.log("Bill number: ",billnumber);
    var Customername = customerdetails.Customername;
    var CustomerNumber = customerdetails.Customernumber
    var CustomerId = customerdetails.Customerid
    console.log("Order created at server...");
    // console.log("Order id: ",orderid);
    // console.log("Customer_id: ",CustomerId);
    // console.log("Bill number: ",totalbill);
    // GenerateBillNumber()
   var orderobj = {
    billno:totalbill,
    customername:Customername,
    customernumber:CustomerNumber,
    timestamp:Date.now(),
    orderid:orderid,
    orderstatus:'created',
    paymentstatus:'Not done',
    paymentmode:'N/A',
    paymenttime:null,
    ordertype:'Dine-In'  
   }
   const neworder = new Neworder(orderobj)
   neworder.save((err) =>{
      if(!err){
        //   console.log("Order created successfully...");
          Order_array.forEach(element => {
            // console.log("Each element came for order: ",element);
            var orderdetails = {
                Name:element.Name,
                Quantity:element.Quantity,
                Price:element.Price,
                Orderid:orderid,
                Orderfromcustomerid:CustomerId
            }
            const neworderdetails = new OrderDetails(orderdetails)
            neworderdetails.save((err)=>{
                if(!err){
                    console.log("Orderdetails saved...");
                }else{
                    console.log("Couldn't save the order detailss...but the order is saved...");
                }
            })
        });
      }else{
          console.log("Could'nt register this order.... (creatorder()):( ");
          console.log("Error message: ",err.message);
      }

  })
  return orderid;
}


export const Orderfetch = async(orderidnumber)=>{
    await OrderDetails.find({Orderid:orderidnumber},function(err,result){
        // console.log("Order fetched-",result)
        if(!err){
            console.log("Order fetched-",result)
        }else{
            console.log("Eroor occured..!!")
        }
    })
}

// export const Getorderid = ()

export const Checkforduplicates = async(Vendorname)=>{
    var testresult;
    const name = Vendorname.toLowerCase()
    await Vendors.find({},function(err,result){
        if(!err){
            result.forEach((element) => {
                var dbname = element.Vendorname.toLowerCase()
                if(name === dbname || dbname.includes(name)){
                    // return true
                    return true
                    // console.log(`${dbname} is same as ${name}`);
                    // console.log("This name is already exist!!");
                }else{
                    // return false
                    // console.log("This name does not exist!!..");
                    return  false
                }
            })
        }else{
            console.log("Something went wrong while checking for duplicates..! ");
        }
    }).clone().catch((err)=>{console.log("Error in checkforduplicates() : ",err)});

    return testresult
    // console.log("Result is: ",result);
}



export async function Updatevendordata(type,vendorname,billamount,billdate,paidamount,paidtime){
//   await Vendors.find({Vendorname:vendorname})
   var resultvendor;
   while(resultvendor===undefined){
    await Vendors.find({Vendorname:vendorname,Billdate:yesterdaysdate},function(err,result){
        if(!err){
            
        }
     }).select('Vendorname Balance FinalBalance -_id').clone().catch((err)=>{console.log("Error in updatevendordata() : ",err)});
   }

}
export async function UpdateNewvendor(vendorname,existingbalance){
   
    const newvendor = new Vendors(vendorobj)
    await newvendor.save()
}
export function Getpreviousdate(today){
    if(!today){
    var currentdate = new Date()
    }else{var currentdate = new Date(today)}
    currentdate.setDate(currentdate.getDate()-1)
    var yesterday = new Date(currentdate).valueOf()
    // yesterday.toLocaleString()
    const Yesterday = new Date(yesterday).toLocaleDateString()
    console.log("Yesterdays date - ",Yesterday);
    return Formatdate(Yesterday)
    // console.log("Today's date is -",n);
}
export function Gettodaysdate(){
    var today = new Date()
today.setDate(today.getDate()).valueOf()
today = new Date(today).toLocaleDateString()
return today;
}

export function Formatdate(date){
    console.log("Recived date to formate:",date);
    var newdate;
    var newmonth;
    var newyear = date.slice(4)
    if(date.length!==10){
        if(date[0].length===1){
            newdate = '0'+date[0]
        }
        if(date[2].length===1){
            newmonth = '0'+date[2]
        }
        var formatteddate = newdate+'/'+newmonth+'/'+newyear;
    }else{
        var formatteddate = date
    }
    console.log("Formatted date:",formatteddate);
    return formatteddate;
   
}


export async function Getpreviousbalance(){
    var previousbalance;
    var date = Getpreviousdate()
    console.log("DAte:",date);
    return new Promise((resolve,reject)=>{
        resolve(
            Vendors.findOne({Billdate:date},function(err,result){
                if(!err){
                    // console.log("previous balance: ",result);
                    if(result.FinalBalance!==0){
                    // console.log("Previous balance:",result.FinalBalance);
                    return result.FinalBalance;
                    }else{
                        // console.log("Previous balance:",result.Balance);
                        return result.Balance;
                    }
                    // totalbill = Number(result);
                }
                else{
                    console.log("Something went wrong while counting the documents!!.. :( ");
                }
            }).clone().catch((err)=>{console.log("Error in generatebillnumber() : ",err);}))
    })
}
// console.log("Previous balance:", await Getpreviousbalance());
export const GenerateEmpid = () =>{
    var empid = ''
    var layer1 = Math.floor(Math.random()*9999)
    layer1 = String(layer1)
    switch (layer1.length) {
        case 1:
            empid = "H1000"+layer1
            break;
        case 2:
            empid = "H100"+layer1
            break;
        case 3:
            empid = "H10"+layer1
            break
        default:
            empid = "H1"+layer1
            break;
    }
    return empid;
}


export async function Getorderdetails(Oid){

    
   
    // result.then((result)=>{
    //     return result
    // })
}