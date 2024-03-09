import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentDetails from './StudentDetails';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

const studentListStyle = {
    maxHeight: 'calc(100vh - 150px)',
    overflowY: 'auto',
  };
  
const studentDetailsStyle = {
  maxHeight: 'calc(100vh - 60px)',
  overflowY: 'auto',
};

const cardHoverStyle = {
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};




const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [passingYear, setPassingYear] = useState('');
  const [CGPA, setCGPA] = useState('');
  const [hoveredCard, setHoveredCard] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cardStyle = {
    marginBottom: '1rem',
    borderRadius: '0.25rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    transition: 'box-shadow .15s ease-in-out',
  };

  useEffect(() => {
    async function fetchStudents() {
      let url = 'http://127.0.0.1:8000/student_profiles/students/';
      const params = new URLSearchParams();

      if (searchTerm) params.append('search', searchTerm);
      if (school) params.append('school', school);
      if (major) params.append('major', major);
      if (passingYear) params.append('passing_year', passingYear);
      if (CGPA) params.append('cgpa', CGPA);

      url += `?${params.toString()}`;

      console.log(url);

      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, [searchTerm, school, major, passingYear, CGPA]);

  const handleStudentClick = student => {
    setSelectedStudent(student);
  };

  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-12 bg-primary text-white py-2">
        <h1 className="text-center">Shiv Nadar University Student Browser</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <div className="row">
          <div className="col-12 mb-2">
            <SearchBar setSearchTerm={setSearchTerm} />
            <FilterBar setSchool={setSchool} setMajor={setMajor} setPassingYear={setPassingYear} setCGPA={setCGPA} />
          </div>
        </div>
        <div className="row">
          <div className="col-12" style={studentListStyle}> 
            {students.map(student => (
              <div
              key={student.id}
              className="card"
              style={hoveredCard === student.id ? {...cardStyle, ...cardHoverStyle} : cardStyle}
              onClick={() => handleStudentClick(student)}
              onMouseEnter={() => setHoveredCard(student.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title text-primary">
                      {student.name}
                    </h5>
                    <div className="text-end">
                      <span className="text-muted">{student.major}, {student.passing_year}</span>
                    </div>
                  </div>
                  <h6 className="card-subtitle mb-2 text-muted">CGPA: {student.cgpa}</h6>
                  <p className="card-text">Areas of Interest: {student.area_of_interest.join(', ')}</p>
                  <p className="card-text">Skills: {student.skills.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-md-6" style={studentDetailsStyle}>
        {!selectedStudent ? (
          <div className="text-center p-5">
            <p className="text-muted">Select a student to view details</p>
          </div>
        ) : (
          <StudentDetails student={selectedStudent} />
        )}
      </div>
    </div>
  </div>

  );
};

export default StudentList;
