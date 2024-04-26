import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Spinner from 'react-bootstrap/Spinner';
import '../signup.css'; // Import the CSS file

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate password
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    // Set loading to true to show spinner
    setLoading(true);

    // Create payload
    const payload = {
      fullname: fullName,
      email: email,
      password: password,
      confirmpassword: confirmPassword
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    // Send POST request
    axios.post('http://192.168.0.180:8000/signup', formData)
      .then(response => {

        console.log("res -------->" + response);

        setLoading(false); // Hide spinner

        if (response.data.status === false) {
          alert(response.data.message);
          // Clear form fields
          setFullName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        } else {
          console.log(response);
          setLoading(false);
          alert(response.data.message);
          navigate('/');
        }
      })
      .catch(error => {
        setLoading(false); // Hide spinner
        console.log(error);
      });
  };  

  return (
    <div className='fullscreen-container'>
      <style>
        {`
          body {
            background-image: url('Signupform.jpg');
            /* Ensure correct path to your image */
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 100vh; /* Ensure the background covers the entire viewport */
          }
        `}
      </style>
      {loading && (
        <div className="overlay">
          <Spinner animation="border" />
        </div>
      )}
      <div className="logo-main">
        <img src="..\signuplogo.jpg" />
        <style>
        {`
          body {
            width: 870px;
            height: 870px;
          }
        `}
      </style>
      </div>
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <h2 className='Signuptitle text-center'>SignUp Form</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
