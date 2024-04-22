import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployerLogin.css';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/student-list');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Employer Login</h2>
        <div className="form-group">
          <label>Employer ID or email:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    </div>
  );
}

export default Login;
