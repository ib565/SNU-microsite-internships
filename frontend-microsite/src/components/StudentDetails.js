import React, { useState } from 'react';
import './StudentDetails.css';
import ContactModal from './ContactModal';

const StudentDetails = ({ student }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const handleRequestResume = () => {
    alert('Resume requested!');
  };

  const handleSubmit = () => {
      alert('Message successfully sent!');
      toggleModal();
  };
  return (
    <div className="student-card card">
        <div className="card-header text-white bg-primary header-bg-color">
            <h3>{student.name}</h3>
        </div>
        <div className="card-body">
            <p>Email: {student.snu_email}</p>
            <p>CGPA: {student.cgpa}</p>
            <p>Passing Year: {student.passing_year}</p>
            <p>Available: {student.is_available ? 'Yes' : 'No'}</p>
            <p>School: {student.school || '-'}</p>
            <p>Major: {student.major || '-'}</p>
            <p>Areas of Interest: {student.area_of_interest?.join(', ') || '-'}</p>
            <p>Skills: {student.skills?.join(', ') || '-'}</p>
            <p>Sex: {student.sex}</p>
            <p>LinkedIn: {student.linkedin_link ? <a href={student.linkedin_link} target="_blank" rel="noopener noreferrer" className="text-primary btn-link">Profile</a> : '-'}</p>
            <p>GitHub: {student.github_link ? <a href={student.github_link} target="_blank" rel="noopener noreferrer" className="text-primary btn-link">Profile</a> : '-'}</p>
            <p>Experience: {student.experience || '- '}</p>
            <p>Projects: {student.projects || '-'}</p>
            <div className="student-details-actions text-center">
              <button type="button" className="btn btn-primary me-2" onClick={handleRequestResume}>Request Resume</button>              
              <button className="btn btn-primary" onClick={toggleModal}>
                Contact Student
              </button>
              <ContactModal
                showModal={showModal}
                toggleModal={toggleModal}
                handleSubmit={handleSubmit}
              />
            </div>

        </div>
    </div>


  );
};

export default StudentDetails;
