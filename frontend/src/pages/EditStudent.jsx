import React, { useState,useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate,useParams} from 'react-router-dom';

const EditStudent = () => {
  const [name,setName]=useState('');
  const [age,setAge]=useState('');
  const [parent,setParent]=useState('');
  const [phone,setPhone]=useState('');
  const [email,setEmail]=useState('');
   
  const [loading,setLoading]=useState(false);
  const navigate =useNavigate();
  const {id}=useParams();
  
  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/student/${id}`)
    .then((response)=>{
      setName(response.data.name);
      setAge(response.data.age);
      setParent(response.data.parent);
      setPhone(response.data.phone);
      setEmail(response.data.email);
      setLoading(false); 

    }).catch(()=>{
      setLoading(false);
      alert('An error happened');
      console.log(error);
    }) 
     
  },[]);
  
  const handleEditStudent=()=>{
    const data={
       name,
       age,
       parent,
       phone,
       email,
      };
    setLoading(true);
    axios
    .put(`http://localhost:5555/student/${id}`,data)
    .then(()=>{
       
      setLoading(false);
      navigate('/');
  })
  .catch((error) => {
  
    setLoading(false);
    alert('An error happened');
    console.log(error);
  });
  };
  return (
    <div className='p-4'>
         <BackButton/>
         <h1 className='text-3xl my-4'>Edit Student</h1>

         {loading ?  <Spinner />:''}

         <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] mx-auto'>
         <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
          type='text'
          value={name}
          onChange={(e)=> setName(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full '
          />
         </div>
         <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Age</label>
          <input
          type='number'
          value={age}
          onChange={(e)=> setAge(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full '
          />
         </div>
         <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Parent</label>
          <input
          type='text'
          value={parent}
          onChange={(e)=> setParent(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full '
          />
         </div>
         <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Phone</label>
          <input
          type='number'
          value={phone}
          onChange={(e)=> setPhone(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full '
          />
         </div>
         <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Email</label>
          <input
          type='text'
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full '
          />
         </div>
         <button className='p-2 bg-sky-300 m-8' onClick={handleEditStudent}>Save</button>
         
         </div>
    </div>
  )
}

export default EditStudent