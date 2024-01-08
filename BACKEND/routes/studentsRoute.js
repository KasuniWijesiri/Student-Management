import express from 'express';
import {Student} from '../models/studentModel.js'

const router = express.Router();

//add Student
router.post('/',async(request,response)=>{
    try{
        if(
            !request.body.name ||
            !request.body.age ||
            !request.body.parent ||
            !request.body.phone ||
            !request.body.email
        ){
            return response.status(400).send({
                message:'send all required fields: name,age,parent,phone,email',
            });
        }
        const newStudent ={
            name: request.body.name,
            age: request.body.age,
            parent: request.body.parent,
            phone: request.body.phone,
            email: request.body.email,


        };

        const student = await Student.create(newStudent);
        
        return response.status(201).send(student);
    }catch(error){
       console.log(err.message);
       response.status(500).send({message:error.message});

    }
})


//read all
router.get('/',async(request, response)=>{
     try{
        const students = await Student.find({});
        
        return response.status(201).json(students);

     }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});

     }
});

//read a student
router.get('/:id',async(request, response)=>{
    try{
        const { id } =  request.params;

       const student = await Student.findById(id);
       
       return response.status(201).json(student);

    }catch(error){
       console.log(error.message);
       response.status(500).send({message:error.message});

    }
});


//update a book
router.put('/:id',async(request, response)=>{
    try{
        if(
            !request.body.name ||
            !request.body.age ||
            !request.body.parent ||
            !request.body.phone ||
            !request.body.email
        ){
            return response.status(400).send({
                message:'send all required fields: name,age,parent,phone,email',
            }); 
        }
        const { id } =  request.params;

       const result = await Student.findByIdAndUpdate(id,request.body);
              
       if(!result){
        return response.status(404).json({message: 'Student not found'});
       }
        return response.status(200).send({message: 'Book updated successfully'});
    
       

    }catch(error){
       console.log(error.message);
       response.status(500).send({message:error.message});

    }
});


//delete a book
router.delete('/:id',async(request, response)=>{
    try{
         
        const { id } =  request.params;

       const result = await Student.findByIdAndDelete(id );
              
       if(!result){
        return response.status(404).json({message: 'Student not found'});
       }
        return response.status(200).send({message: 'Book deleted successfully'});
    
       

    }catch(error){
       console.log(error.message);
       response.status(500).send({message:error.message});

    }
});

export default router;