import  express from "express";
import bodyparser from "body-parser";
// import PostData from "./model/postdata.js";
import { senddata } from "./controllers/UpdatetoDatabase.js";
import { getdata } from "./controllers/getdata.js";
import cors from 'cors';
import mongoose from "mongoose";
import { senddetails } from "./controllers/Updatedetails.js";
async function main(){
    await mongoose.connect('mongodb://localhost:27017/AdminHss')
}
main().then(console.log('Database pluged in!!')).catch(err=>console.log(err));
const app = express()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}));
const port  = process.env.PORT || 4000
app.post('/',senddata)
app.get('/data',getdata)
app.post('/senddetails',senddetails)

app.listen({port},(()=>{console.log('server is running on:', port)}))
