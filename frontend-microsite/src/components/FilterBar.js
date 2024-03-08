import React, { useState, useEffect } from 'react';

function FilterBar({ setSchool, setMajor, setPassingYear }) {
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
          passingYears: filterOptions.passingYears, // Keep existing passingYears or update similarly
        });
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
      }
    }
  
    fetchFilterOptions();
  }, []);
  

  return (
    <div>
      <select onChange={(e) => setSchool(e.target.value)}>
        <option value="">Select School</option>
        {filterOptions.schools.map(school => (
          <option key={school.id} value={school.name}>{school.name}</option>
        ))}
      </select>

      <select onChange={(e) => setMajor(e.target.value)}>
        <option value="">Select Major</option>
        {filterOptions.majors.map(major => (
          <option key={major.id} value={major.name}>{major.name}</option>
        ))}
      </select>
        
      <input
        type="number"
        placeholder="Passing Year"
        onChange={(e) => setPassingYear(e.target.value)}
      />
    </div>
  );
}

export default FilterBar;
