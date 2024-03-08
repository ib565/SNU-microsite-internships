import React from 'react';
import StudentList from './components/StudentList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <h1>Students</h1>
      <StudentList />
    </div>
  );
};

export default App;