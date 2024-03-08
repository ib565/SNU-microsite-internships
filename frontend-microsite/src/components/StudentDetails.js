import React from 'react';

const StudentDetails = ({ student }) => {
  return (
    <div>
        <h3>Details for {student.name}</h3>
        <p>Email: {student.snu_email}</p>
        <p>CGPA: {student.cgpa}</p>
        <p>Available: {student.is_available ? 'Yes' : 'No'}</p>
        <p>School: {student.school || '-'}</p>
        <p>Major: {student.major || '-'}</p>
        <p>Areas of Interest: {student.area_of_interest?.join(', ') || '-'}</p>
        <p>Skills: {student.skills?.join(', ') || '-'}</p>
        <p>Sex: {student.sex}</p>
        <p>LinkedIn: {student.linkedin_link ? <a href={student.linkedin_link} target="_blank" rel="noopener noreferrer">Profile</a> : '-'}</p>
        <p>GitHub: {student.github_link ? <a href={student.github_link} target="_blank" rel="noopener noreferrer">Profile</a> : '-'}</p>
        <p>Experience: {student.experience || '- Provided'}</p>
        <p>Projects: {student.projects || '-'}</p>
    </div>
  );
};

export default StudentDetails;
