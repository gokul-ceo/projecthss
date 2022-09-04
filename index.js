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
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cors());
async function main(){
    // const NAME = process.env.NAME;
    // const PWD  = process.env.PASSWORD;
    await mongoose.connect('mongodb+srv://'+process.env.NAME+':'+process.env.PASSWORD+'@cluster0.6rrt67l.mongodb.net/HSS');
  
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
app.post('sadx232asdfasdf/',senddata)
app.get('/sadx232asdfasdf/data',getdata)
app.post('/sadx232asdfasdf/senddetails',senddetails)
var port = process.env.PORT || 4000;
app.listen({port},(()=>{console.log('server is running on:', port)}))
