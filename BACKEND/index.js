import express, { request, response } from "express";
import{PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Student } from "./models/studentModel.js";
import studentsRoute from './routes/studentsRoute.js'
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/',(request, response)=>{
    console.log(request);
    return response.status(243).send("Hello")
});

app.use('/students',studentsRoute);


mongoose
  .connect(mongoDBURL)
  .then(()=>{
    console.log("App connected to the database");
    app.listen(PORT,()=>{
    console.log(`App is listening: ${PORT}`);
});
  })
  .catch(()=>{
    console.log(error);
  });
 

