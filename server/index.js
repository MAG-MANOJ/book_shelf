import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

app.get('/',(req,res)=>{
    res.status(200).send('The application works good');
})

main().then(console.log('App connected with Database')).catch(err=>console.log(err.message));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/book');
    app.listen(PORT,()=>console.log(`Application listen on Port ${PORT}...`));
}