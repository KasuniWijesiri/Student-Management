import express from 'express';
import { Student } from '../models/studentModel.js';

const router = express.Router();

//add Student
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.age ||
            !request.body.parent ||
            !request.body.phone ||
            !request.body.email
        ) {
            return response.status(400).send({
                message: 'send all required fields: name,age,parent,phone,email',
            });
        }
        const newStudent = {
            name: request.body.name,
            age: request.body.age,
            parent: request.body.parent,
            phone: request.body.phone,
            email: request.body.email,


        };

        const student = await Student.create(newStudent);

        return response.status(201).send(student);
    } catch (error) {
        console.log(err.message);
        response.status(500).send({ message: error.message });

    }
})


//read all
router.get('/', async (request, response) => {
    try {
        // Fetching Student data from the database
        const student = await Student.find({});

        // Sending the fetched Student as a JSON response with a status code of 200 (OK)
        response.status(200).json({
            count: student.length,
            data: student
        });
    } catch (error) {
        // Logging the error to the console
        console.error(error.message);

        // Sending an error response with a status code of 500 (Internal Server Error)
        response.status(500).send({ message: error.message });
    }
});

//read a student
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        // Fetching student data from the database
        const student = await Student.findById(id);

        // Sending the fetched student as a JSON response with a status code of 200 (OK)
        response.status(200).json(student)
    } catch (error) {
        // Logging the error to the console
        console.error(error.message);

        // Sending an error response with a status code of 500 (Internal Server Error)
        response.status(500).send({ message: error.message });
    }
});


//update a book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.age ||
            !request.body.parent ||
            !request.body.phone ||
            !request.body.email
        ) {
            return response.status(400).send({
                message: 'Send all required fields'
            });
        }

        // Extract the Student item ID from the request parameters
        const { id } = request.params;

        // Update the Student item in the database using findByIdAndUpdate
        const result = await Student.findByIdAndUpdate(id, request.body);

        // Check if the Student item was not found in the database
        if (!result) {
            return response.status(404).json({ message: 'Student not found' });
        }

        // Send a success response with a status code of 200 (OK)
        return response.status(200).send({ message: 'Student updated successfully' });

    } catch (error) {
        // Log any errors to the console
        console.error(error.message);

        // Send an error response with a status code of 500 (Internal Server Error)
        response.status(500).send({ message: error.message });
    }
});


//delete a book
router.delete('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const result = await Student.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Student not found' });
        }
        return response.status(200).send({ message: 'Book deleted successfully' });



    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
});

export default router;