import Vendors from "../../model/Vendor.js";
import { Formatdate, Gettodaysdate } from "../../worker.js";
// import { Checkforduplicates } from "../worker.js";   

export async function Vendorhandler(req,res){
    console.log("Sent from client: ",req.body);
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
    var vendorobj = {
        Vendorname:req.body.Vendorname,
        Vendorbalance:req.body.Balance,
        Addedat:TodayDate,
        Billdate:0,
        Billamount:0,
        Totalbalance:0,
        Paidamout:0,
        FinalBalance:0,
        timestamp:Date.now()
    }
    const newvendor = new Vendors(vendorobj)
    await newvendor.save()
    res.sendStatus(200)
}