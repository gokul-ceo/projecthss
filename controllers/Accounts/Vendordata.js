// import { Updatevendordata } from "../../worker.js"
import { Gettodaysdate,Formatdate, Getpreviousbalance, Getpreviousdate } from "../../worker.js";
import Vendors from "../../model/Vendor.js";
import Vendornames from "../../model/VendorNames.js";

export const Vendordata = async(req,res)=>{
    // vendorname:name,
    //        amount:billamount,
    //        paid:paidamount,
    //        dateofbill:billdate
    // console.log("request body:".req.body);
    var today = new Date()
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var TodayDate = dd + '/' + mm + '/' + yyyy;
    var name = req.body.vendorname;
    var amount = Number( req.body.amount);
    var paidamount = Number(req.body.paid);
    var dateofbill = req.body.dateofbill
    console.log("Name:",name);
    console.log("Bill amount:",amount);
    console.log("Paid amount: ",paidamount);
    console.log("Bill date:",dateofbill);
       var currentbalance = Promise.resolve(
        await Vendornames.findOne({Vendorname:name},async function(err,result){
            if(!err){
                // if(result.FinalBalance!==0){
                    if(result===null){
                        console.log("Result is null!");
                    }else{
                        if(result!==undefined || result !==null){
                            var {balance} = result
                            return balance;
                        }
                }
                    }
              
    
        }).select('Vendorbalance -_id').clone().catch((err)=>{console.log("Error in find the vendors... ",err)})
       )
       currentbalance.then(async (balance)=>{
        var _Balance= balance.Vendorbalance
        var newbalance = _Balance + amount;
        var finalbalance = newbalance - paidamount;
         var vendorobj = {
        Vendorname:req.body.Vendorname,
        Balance:_Balance,
        Addedat:TodayDate,
        Billdate:dateofbill,
        Billamount:amount,
        Totalbalance:newbalance,
        Paidamout:paidamount,
        FinalBalance:finalbalance,
        timestamp:Date.now()
    }   
        const newvendor = new Vendors(vendorobj)
        newvendor.save(async (err) => {
               if (!err) {
                   await Vendornames.updateOne({ Vendorname: name }, { Vendorbalance: finalbalance }, (err) => {
                    if(!err){
                        console.log("Successfully saved and updated!");
                    }
                   }).clone().catch((err)=>{console.log("Error in updating the balance after saving new bill... ",err)})
               }


           })
       })
    
    // var totalbalance = existingbalance + amount;
    // console.log("Totalbalance:",totalbalance);
    // var finalbalance = totalbalance - paidamount;
    // console.log("Finalbalance:",finalbalance);
    // var today = Gettodaysdate()
    // var vendorobj = {
    //     Vendorname:req.body.Vendorname,
    //     Balance:existingbalance,
    //     Addedat:Formatdate(today),
    //     Billdate:dateofbill,
    //     Billamount:amount,
    //     Totalbalance:totalbalance,
    //     Paidamout:paidamount,
    //     Paidtime:Date.now(),
    //     FinalBalance:finalbalance,
    //     timestamp:Date.now()
    // }
    // const newvendor = new Vendors(vendorobj);
    // if(existingbalance!==undefined){
    // await newvendor.save()
    // }

//    var result = await Updatevendordata(req.query.type,req.body.vendorname,req.body.amount)
//    console.log("Result from vendordata: ",result);

}