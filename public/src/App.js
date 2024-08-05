import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from './components/Registration';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Protected from './components/Protected';
import StudentList from './components/Students/StudentList';
import Logout from './components/Logout';
import StudentCreate from './components/Students/StudentCreate';
import StudentEdit from './components/Students/StudentEdit';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/studentedit' element={<StudentEdit />} />
          <Route path='/studentcreate' element={<StudentCreate />} />
          <Route path='/login' element={<Login />} />
          <Route path='/studentlist' element={<StudentList />} /> 
          <Route path='/dashboard' element={<Protected Component={Dashboard} />} />
          <Route path='/registration' element={<Protected Component={Registration}  />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
