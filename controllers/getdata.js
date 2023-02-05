import PostData from "../model/postdata.js";

export const getdata =  async (req,res)=>{
//     var today = new Date()
//   var dd = today.getDate();
//         var mm = today.getMonth() + 1;
  
//         var yyyy = today.getFullYear();
//         if (dd < 10) {
//             dd = '0' + dd;
//         }
//         if (mm < 10) {
//             mm = '0' + mm;
//         }
//         var TodayDate = dd + '/' + mm + '/' + yyyy;
    try {
       
        const data = await PostData.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error)
    }
}