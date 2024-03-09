import React from 'react';

const StudentDetails = ({ student }) => {
  return (
    <div class="card">
    <div class="card-header bg-primary text-white">
        <h3>{student.name}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Email: {student.snu_email}</li>
            <li class="list-group-item">CGPA: {student.cgpa}</li>
            <li class="list-group-item">Passing Year: {student.passing_year}</li>
            <li class="list-group-item">Available: {student.is_available ? 'Yes' : 'No'}</li>
            <li class="list-group-item">School: {student.school || '-'}</li>
            <li class="list-group-item">Major: {student.major || '-'}</li>
            <li class="list-group-item">Areas of Interest: {student.area_of_interest?.join(', ') || '-'}</li>
            <li class="list-group-item">Skills: {student.skills?.join(', ') || '-'}</li>
            <li class="list-group-item">Sex: {student.sex}</li>
            <li class="list-group-item">LinkedIn: {student.linkedin_link ? <a href={student.linkedin_link} target="_blank" rel="noopener noreferrer" class="text-primary">Profile</a> : '-'}</li>
            <li class="list-group-item">GitHub: {student.github_link ? <a href={student.github_link} target="_blank" rel="noopener noreferrer" class="text-primary">Profile</a> : '-'}</li>
            <li class="list-group-item">Experience: {student.experience || '- '}</li>
            <li class="list-group-item">Projects: {student.projects || '-'}</li>
        </ul>
    </div>
</div>

  );
};

export default StudentDetails;
