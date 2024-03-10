import React from 'react';
import './StudentDetails.css';

const StudentDetails = ({ student }) => {
  return (
    <div class="card student-card">
        <div class="card-header bg-primary text-white">
            <h3>{student.name}</h3>
        </div>
        <div class="card-body">
            <p>Email: {student.snu_email}</p>
            <p>CGPA: {student.cgpa}</p>
            <p>Passing Year: {student.passing_year}</p>
            <p>Available: {student.is_available ? 'Yes' : 'No'}</p>
            <p>School: {student.school || '-'}</p>
            <p>Major: {student.major || '-'}</p>
            <p>Areas of Interest: {student.area_of_interest?.join(', ') || '-'}</p>
            <p>Skills: {student.skills?.join(', ') || '-'}</p>
            <p>Sex: {student.sex}</p>
            <p>LinkedIn: {student.linkedin_link ? <a href={student.linkedin_link} target="_blank" rel="noopener noreferrer" class="text-primary btn-link">Profile</a> : '-'}</p>
            <p>GitHub: {student.github_link ? <a href={student.github_link} target="_blank" rel="noopener noreferrer" class="text-primary btn-link">Profile</a> : '-'}</p>
            <p>Experience: {student.experience || '- '}</p>
            <p>Projects: {student.projects || '-'}</p>
        </div>
    </div>


  );
};

export default StudentDetails;
