import  express from "express";
import bodyparser from "body-parser";
import { senddata } from "./controllers/UpdatetoDatabase.js";
import { getdata } from "./controllers/getdata.js";
import mongoose from "mongoose";
import cors from "cors"
import { senddetails } from "./controllers/Updatedetails.js";
import * as dotenv from 'dotenv';
dotenv.config()
const app = express()
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cors());
async function main(){
    
    await mongoose.connect(process.env.URL);
  
}

main().then(console.log('Database pluged in!!')).catch(err=>console.log(err));
// import cor
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}));
app.post('/',senddata)
app.get('/data',getdata)
app.post('/senddetails',senddetails)
var port = process.env.PORT || 4000;
app.listen({port},(()=>{console.log('server is running on:', port)}))
