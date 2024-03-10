import React, { useState, useEffect } from 'react';
import './FilterBar.css';


function FilterBar({ setSchool, setMajor, setPassingYear, setCGPA }) {
  const [filterOptions, setFilterOptions] = useState({
    schools: [],
    majors: [],
    passingYears: [],
  });

  useEffect(() => {
    async function fetchFilterOptions() {
      try {
        const [schoolsResponse, majorsResponse] = await Promise.all([
          fetch('http://127.0.0.1:8000/student_profiles/schools/'),
          fetch('http://127.0.0.1:8000/student_profiles/majors/'),
        ]);
  
        if (!schoolsResponse.ok || !majorsResponse.ok) {
          throw new Error('HTTP error when fetching filter options');
        }
  
        const schools = await schoolsResponse.json();
        const majors = await majorsResponse.json();
  
        setFilterOptions({
          schools: schools,
          majors: majors,
        });
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
      }
    }
  
    fetchFilterOptions();
  }, []);
  

  return (
    <div className="d-flex flex-wrap">
      <select className="form-select filter-select me-2" onChange={(e) => setSchool(e.target.value)}>
        <option value="">Select School</option>
        {filterOptions.schools.map(school => (
          <option key={school.id} value={school.name}>{school.name}</option>
        ))}
      </select>

      <select className="form-select filter-select me-2" onChange={(e) => setMajor(e.target.value)}>
        <option value="">Select Major</option>
        {filterOptions.majors.map(major => (
          <option key={major.id} value={major.name}>{major.name}</option>
        ))}
      </select>
        
      <input
        className="form-control filter-input me-2"
        type="number"
        placeholder="Passing Year"
        onChange={(e) => setPassingYear(e.target.value)}
      />

      <input
        className="form-control filter-input"
        type="number"
        placeholder="Minimum CGPA"
        onChange={(e) => setCGPA(e.target.value)}
        min="0"
        max="10"
        step="0.01"
      />
    </div>


  );
}

export default FilterBar;
