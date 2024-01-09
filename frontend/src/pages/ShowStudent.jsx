import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner'

const ShowStudent = () => {

  const [student,setStudent]=useState({});
  const [loading,setLoading]=useState(false);
  const {id} =useParams();

  useEffect(()=>{
    setLoading(true);
    axios
    .get(`http://localhost:5555/student/${id}`)
    .then((Response)=>{
      setStudent(Response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error); // Log the error
      setLoading(false);
    })
    
  },[])

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Show Student</h1>
      {loading ?(
        <Spinner/>

      ):(
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>ID</span>
          <span >{student._id}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Name</span>
          <span >{student.name}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Age</span>
          <span >{student.age}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Parent</span>
          <span >{student.parent}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Phone</span>
          <span >{student.phone}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Email</span>
          <span >{student.email}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Create Time</span>
          <span >{new Date(student.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
          <span >{new Date(student.updatedAt).toString()}</span>
          </div>
      </div>
       )}
    </div>
  )
}

export default ShowStudent