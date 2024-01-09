import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentsCard from '../components/home/StudentsCard';
import StudentsTable from '../components/home/StudentsTable';


const Home = () => {
  // State to hold student data and loading state
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch student data when component mounts
    setLoading(true);
    axios
      .get('http://localhost:5555/student')
      .then((response) => {
        setStudent(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error); // Log the error
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Student List</h1>
        <Link to='/student/add'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Name</th>
              <th className='border border-slate-600 rounded-md'>Age</th>
              <th className='border border-slate-600 rounded-md'>Parent</th>
              <th className='border border-slate-600 rounded-md'>Phone</th>
              <th className='border border-slate-600 rounded-md'>Email</th>
              <th className='border border-slate-600 rounded-md'>Operation</th>
            </tr>
          </thead>
          <tbody>
            {student.map((student, index) => (
              <tr key={student._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {student.name}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {student.age}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {student.parent}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {student.phone}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {student.email}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/student/details/${student._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/student/edit/${student._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/student/delete/${student._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
