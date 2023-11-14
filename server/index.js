import express, { request, response } from "express";
import mongoose from "mongoose";
import { Book } from "./model/bookModel.js";

const app = express();
const PORT = 3000;

//Middleware
app.use(express.json());

app.get('/',(request,response)=>{
    response.status(200).send('The application works good');
})

//add the book to the database
app.post('/books',async (request, response) =>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            response.status(400).send({message:'cannot access the required fields: title, auther, publishYear'});
        };
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        const addBook = await Book.create(newBook);
        return response.status(200).send(addBook)
    }catch(error){
        console.log(error.message)
    }
});

//Update the book by it's ID

app.put('/books/:id',async(request, response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            response.status(400).send({message:'cannot access the required fields: title, auther, publishYear'});
        };

        const {id} = request.params;
        const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
        
        if(!isValidObjectId){
            return response.status(404).send({message:'Book not found'});
        }

        const result = await Book.findByIdAndUpdate(id,request.body);
        
        if (!result) {
            return response.status(404).send({ message: 'Book not found' });
        }

        return response.status(200).send({message:'Book updated'})

    }catch(error){
        console.log(error.message);
        response.status(500).send(error.message);
    }
})


// Delete Book by it's ID
app.delete('/books/:id',async(request,response)=>{

    try{
        const {id} = request.params;
        const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    
        if(!isValidObjectId){
            return response.status(404).send({message:"Book not Founded"});
        }
        const result = await Book.findByIdAndDelete(id);
    
        if(!result){
            return response.status(404).send({message:"Book not Founded"});
        }
    
        return response.status(200).send({message:"Book Deleted"});
    }catch(error){
        console.log(error.message);
        response.status(500).send(error.message)
    }

})


// Get the all Book
app.get('/books',async(request, response)=>{
    try{
        const book = await Book.find();
        response.status(200).json({
            count: book.length,
            data: book
        })
    }catch(error){
        console.log(error.message);
        response.status(500).send(error.message)
    }
})

//Get book by ID of the book
app.get('/books/:id',async(request, response)=>{
    try{
        const {id} = request.params;
        const book = await Book.findById(id);
        response.status(200).send(book);
        
    }catch(error){
        console.log(error.message);
        response.status(500).send(error.message);
    }
})


main().then(console.log('App connected with Database')).catch(err=>console.log(err.message));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/book');
    app.listen(PORT,()=>console.log(`Application listen on Port ${PORT}...`));
}