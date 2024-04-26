import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate



const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate password
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;

    }

    // Other validation logic can be added here

    // If all validation passed, set submitted to true
    setSubmitted(true);
    navigate('/')


  };

  return (
    <div className='fullscreen-container' style={{ backgroundImage: 'url(Signupform.jpg)', height: '606px' }}>
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
        {submitted && <p className="success">Sign up successful!</p>}
      </form>
      </div>
    </div>
  );
};

export default Signup;
