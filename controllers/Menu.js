import updateMenuitem from "../model/updatemenuitem.js";

export const Menu = (req,res)=>{
    var type = req.query.type;
    var time = new Date()
    if(type){
          updateMenuitem.find({Type:type}).select('-_id').exec()
        .then((result)=>{
            res.json(result)
        })
    }else if(type===undefined){
        if(time.getHours()<11){
            updateMenuitem.find({Type:"M"}).select('-_id').exec()
            .then((result)=>{
                console.log("Result:",result);
                res.json(result)
            })
            console.log("Customer should be displayed breakfast menu");
       
        }else if (time.getHours() >=11){
            console.log("This is lunch time bruh.....");
            updateMenuitem.find({Type:"L"}).select('-_id').exec()
            .then((result)=>{
                res.json(result)
            })
        }else if(time.getHours() >= 17){
            updateMenuitem.find({Type:"D"}).select('-_id').exec()
            .then((result)=>{
                res.json(result)
            })
        }
    }

 
}