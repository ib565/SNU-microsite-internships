import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/EmployerLogin';
import StudentList from './components/StudentList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/employer-login" element={<Login />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/" element={<Navigate replace to="/employer-login" />} />
      </Routes>
    </Router>
  );
};

export default App;
