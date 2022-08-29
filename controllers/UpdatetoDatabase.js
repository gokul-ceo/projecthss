import PostData from "../model/postdata.js";


export const senddata = async(req,res)=>{
    try{
        console.log(req.body);
        const newdata = new PostData(req.body);
        newdata.save(function(err){
            if (!err){
                console.log('Data has been updated to database!');
            }else{
                console.log('Oops! an error occured',err);
            }
        })
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}