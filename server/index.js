import express from "express";

const app = express();
const PORT = 3000;

app.get('/',(req,res)=>{
    res.status(200).send('The application works good');
})
app.listen(PORT,()=>console.log(`Application listen on Port ${PORT}...`));