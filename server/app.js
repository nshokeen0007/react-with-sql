const express=require('express')
const app=express();
const dotenv=require('dotenv')
const bodyparser=require("body-parser")
dotenv.config({path:'./.env/config.env'})
app.use(express.json());
app.use(require('./Router/auth'))

app.use(express.static('uploads'));
app.use('/uploads',express.static('uploads'));



// data base connection
const Con=require('./Db/Config')
















app.use(bodyparser.urlencoded({extended:true}))
const PORT=process.env.PORT
app.listen(PORT,()=>console.log("Backend run on this port= " +`${PORT}`))