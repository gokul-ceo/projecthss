import  express from "express";
import bodyparser from "body-parser";
import { senddata } from "./controllers/UpdatetoDatabase.js";
import { getdata } from "./controllers/getdata.js";
import cors from 'cors';
import mongoose from "mongoose";
import { senddetails } from "./controllers/Updatedetails.js";
import * as dotenv from 'dotenv';
dotenv.config()
async function main(){
    
    await mongoose.connect(`mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.gdrlwqs.mongodb.net/projecthss`,{useNewUrlParser:true,useUnifiedTopology:true});
  
}

main().then(console.log('Database pluged in!!')).catch(err=>console.log(err));
const app = express()
app.use(cors())
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}));
app.post('/',senddata)
app.get('/data',getdata)
app.post('/senddetails',senddetails)

app.listen(process.env.PORT || 4000,(()=>{console.log('server is running on:', port)}))
