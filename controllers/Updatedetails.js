import CrediDebitTable from "../model/CreditDebit.js"

export const senddetails = async(req,res)=>{
    try {
        console.log(req.body);
        const newupdate = new CrediDebitTable(req.body);
        newupdate.save(function(err){
            if (!err){
                console.log("credit debit has been uploaded");
            }else{
                console.log('ooppsss error occured!!');
            }
        })
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}