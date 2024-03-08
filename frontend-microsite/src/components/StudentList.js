import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentDetails from './StudentDetails';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [passingYear, setPassingYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStudents() {
      let url = 'http://127.0.0.1:8000/student_profiles/students/';
      const params = new URLSearchParams();

      if (searchTerm) params.append('search', searchTerm);
      if (school) params.append('school', school);
      if (major) params.append('major', major);
      if (passingYear) params.append('passing_year', passingYear);

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
  }, [searchTerm, school, major, passingYear]);

  const handleStudentClick = student => {
    setSelectedStudent(student);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <SearchBar setSearchTerm={setSearchTerm} />
          <FilterBar setSchool={setSchool} setMajor={setMajor} setPassingYear={setPassingYear} />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {students.map(student => (
            <div key={student.id} className="card mb-3" onClick={() => handleStudentClick(student)}>
              <div className="card-body">
                <h5 className="card-title text-primary">{student.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{student.major}</h6>
                <p className="card-text">Areas of Interest: {student.area_of_interest.join(', ')}</p>
                <p className="card-text">Skills: {student.skills.join(', ')}</p>
                <p className="card-text">Graduation Year: {student.passing_year}</p>
                <p className="card-text">CGPA: {student.cgpa}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedStudent && <StudentDetails student={selectedStudent} />}
    </div>
  );
};

export default StudentList;
