import Vendors from "../../model/Vendor.js"
import jwtDecode from "jwt-decode";
import { GetRole } from "../../worker.js";
import Vendornames from "../../model/VendorNames.js";

export const Vendorsmanager = async(req,res)=>{
    console.log("Query:",req.query);
    console.log("Params:",req.params);
    // if(req.params.vendorname==='null'){
    //     await Vendornames.distinct('Vendorname',function(err,result){
    //         if(!err){
    //             res.json(result)
    //         }else{
    //             console.log("Something went wrong in vendors manager while the params vendorname is null");
    //         }
    //     }).clone().catch((err)=>{console.log("Error in Vendorsmanager() : ",err)});
    // } else{
    try {
        var token = req.query.token;
        if(token!==' '||token!==null){
            if(token===''){
               console.log("Check the token again..!");
            }else{
                var decoded = jwtDecode(token)
            }
            //    console.log("Decoded:",decoded);
            // console.log("Role:",GetRole(token));
            var role = GetRole(token)
            console.log("Role is:",role);
            if(role==='owner'){
                console.log("owner is accessing!...");

                await Vendornames.find({},function(err,result){
                    if(!err){
                        res.json(result)
                        // var role = GetRole(authHeader)
                        // console.log("role:",role);
                    }else{
                        console.log("Something went wrong while fetching the vendors.. !");
                        res.sendStatus(404)
                    }
                }).select('Vendorname Balance Addedat -_id').clone().catch((err)=>{console.log("Error in Vendorsmanager() : ",err)});
            }else{
                console.log("Staff is accessing!...");
                await Vendornames.find({},function(err,result){
                    if(!err){
                        console.log("result:",result);
                        res.json(result)
                    }else{
                        console.log("Something went wrong while fetching the vendors.. !");
                        res.sendStatus(404)
                    }
                }).select('Vendorname  Addedat -_id').clone().catch((err)=>{console.log("Error in Vendorsmanager() : ",err)});
            }
        }
    

        
    } catch (error) {
        console.log("Something went wrong in vendors manager please look on to this.............");
        console.log("We captured some error here are they:",error);
    }
// }

}