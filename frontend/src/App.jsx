 import React from 'react'
 import { Routes,Route } from 'react-router-dom'
 import Home from './pages/Home';
 import AddStudent from './pages/AddStudent';
 import ShowStudent from './pages/ShowStudent';
 import EditStudent from './pages/EditStudent';
 import DeleteStudent from './pages/DeleteStudent';

 const App = () => {
   return (
     <Routes> 
      <Route path='/' element={<Home/>} /> 
      <Route path='/student/add' element={<AddStudent/>} /> 
      <Route path='/student/details/:id' element={<ShowStudent/>} /> 
      <Route path='/student/edit/:id' element={<EditStudent/>} /> 
      <Route path='/student/delete/:id' element={<DeleteStudent/>} /> 
     </Routes>
   )
 }
 
 export default App