import updateMenuitem from "../../model/updatemenuitem.js";
import {menulist} from '../../menu-list.js'
export const Updatemenucollection=(req,res)=>{
    // res.sendStatus(404).json("This route is only for development purpose!")
    // console.log("Params: ",req.params);
    menulist.forEach(element => {
      const menuobj = {
        Item:element,
        Available:false,
        Quantity:0,
        Price:0,
        Type:'',
        Lastupdated : Date.now()
      }
      const newmenuitem = new updateMenuitem(menuobj)
      newmenuitem.save(function(err){
          if(!err){
              console.log("Item saved successfully!!");
          }else{
              console.log("Something went wrong :(");
              console.log("Error message: ",err.message);
          }
      })
      
    });
    res.json("Executed successfully!")
  };