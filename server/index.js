import express, { request, response } from "express";
import mongoose from "mongoose";
import cors  from "cors";
import booksRoute from "./routes/booksRoute.js";

const app = express();
const PORT = 3000;

//Middleware
app.use(express.json());
app.use('/books',booksRoute)
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type']
}))

app.get('/',(request,response)=>{
    response.status(200).send('The application works good');
})

main().then(console.log('App connected with Database')).catch(err=>console.log(err.message));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/book');
    app.listen(PORT,()=>console.log(`Application listen on Port ${PORT}...`));
}