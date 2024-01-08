import express, { json, request, response } from "express"; // Removed unnecessary imports
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import { Student } from "./models/studentModel.js";
import studentRoute from './routes/studentRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json()); // Corrected the method name


//Middleware for handling CORS POLICY
//opt1
app.use(cors());
//opt2
//app.use(cors({
  //  origin: 'http://localhost:3000',
  //  methods: ['GET', 'POST', 'PUT', 'DELETE'],
   // allowedHeaders: ['Content-Type'],
//})
//);
////////////////////////////////////////

app.get('/', (request, response) => {
  console.log(request);
  return response.status(200).send('Welcome Student'); // Changed status to 200
});


app.use('/student', studentRoute);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("App connected to the database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
