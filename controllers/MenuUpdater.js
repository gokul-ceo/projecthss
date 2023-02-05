export const MenuUpdater = async(req,res)=>{
    res.sendStatus(404).json("This route is only for development purpose!")
    // console.log("Params: ",req.params);
    // menulist.forEach(element => {
    //   const menuobj = {
    //     Item:element,
    //     Available:false,
    //     Quantity:0,
    //     Price:0,
    //     Lastupdated : Date.now()
    //   }
    //   const newmenuitem = new updateMenuitem(menuobj)
    //   newmenuitem.save(function(err){
    //       if(!err){
    //           console.log("Item saved successfully!!");
    //       }else{
    //           console.log("Something went wrong :(");
    //           console.log("Error message: ",err.message);
    //       }
    //   })
      
    // });
}