import updateMenuitem from "../model/updatemenuitem.js";
export const MenutoPos = async(req,res)=>{
    var string = req.params.substring
    var Menulist = []
    await updateMenuitem.find({},function(err,result){
        if(!err){
            // console.log("Result from substring:",result);
            if(result!==undefined){
                Menulist = result
            }
        }else{
            console.log("Couldn't find substring!");
        }
    }).clone().catch((err)=>{console.log("Error in possend route.. ",err);})
    // console.log("Menulist:",Menulist);
    var resultlist = []
   Menulist.forEach(element => {
    if(element.Item.includes(string) ){
        resultlist.push(element)
    }
   });
   console.log(`Result list for substring-${string}:`,resultlist);
}