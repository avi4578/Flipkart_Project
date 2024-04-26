import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PopUp from './PopUp';
//import '../App.css';
import '../Login.css';
import Chatbot from './chatbot'; // Importing Chatbot from the separate file
import axios from 'axios';


// Your Login component code here without the locally defined Chatbot component



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const canvasRef = useRef(null);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showChatbot, setShowChatbot] = useState(false); // State to manage chatbot visibility


    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            initializeCaptcha(ctx);
        }
    }, []);

    const generateRandomChar = (min, max) =>
        String.fromCharCode(Math.floor
            (Math.random() * (max - min + 1) + min));

    const generateCaptchaText = () => {
        let captcha = '';
        for (let i = 0; i < 3; i++) {
            captcha += generateRandomChar(65, 90);
            captcha += generateRandomChar(97, 122);
            captcha += generateRandomChar(48, 57);
        }
        return captcha.split('').sort(
            () => Math.random() - 0.5).join('');
    };

    const drawCaptchaOnCanvas = (ctx, captcha) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
        const letterSpace = 150 / captcha.length;
        for (let i = 0; i < captcha.length; i++) {
            const xInitialSpace = 25;
            ctx.font = '20px Roboto Mono';
            ctx.fillStyle = textColors[Math.floor(
                Math.random() * 2)];
            ctx.fillText(
                captcha[i],
                xInitialSpace + i * letterSpace,

                // Randomize Y position slightly 
                Math.floor(Math.random() * 16 + 25),
                100
            );
        }
    };

    const initializeCaptcha = (ctx) => {
        setUserInput('');
        const newCaptcha = generateCaptchaText();
        setCaptchaText(newCaptcha);
        if (ctx) {
            drawCaptchaOnCanvas(ctx, newCaptcha);
        }
    };

    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleChange = (e) => {
        setEmail(e.target.value.trim()); // Trim the email value
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    

         // Validate captcha
    if (userInput.toUpperCase() !== captchaText.toUpperCase()) {
        alert("Incorrect captcha! Please try again.");
        return;
    }
        // Create payload
        const payload = {
            email: email,
            password: password,
        };
    
        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));
    
        // Send POST request
        axios.post('http://192.168.0.180:8000/login', formData)
            .then(response => {
                console.log("res -------->" + response);
    
                if (response.data.status === true) {
                    alert("login successfully");
                    navigate("/Curdoperationinform");
                } else {
                    console.log(response);
                    alert(response.data.message);
                    navigate('/NewPage');
                }
            })
            .catch(error => {
                console.log(error);
                // Handle error here
            });
    };
    
    

    
    
    

    const validate = () => {
        const error = {};

        if (!email.trim()) {
            error.email = "Email is Required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            error.email = "Please enter a valid email address";
        }

        if (!password.trim()) {
            error.password = "Password is Required";
        } else if (password.length < 8) {
            error.password = "Password must be at least 8 characters long";
        }

        return error;
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    const handleClosePopUp = () => {
        setIsPopUpOpen(false);
    };

    const handleForgotPasswordSubmit = (event) => {
        event.preventDefault();
        // Check if the entered email is valid
        if (isValidEmail(forgotPasswordEmail)) {
            // Send a request to reset the password
            // Example:
            // resetPassword(forgotPasswordEmail);
            // Here, resetPassword is a function that sends a request to reset the password
            // You need to implement this function based on your backend API
            // After successful submission, show an alert saying "Email sent successfully"
            alert("Email sent successfully");
        } else {
            // If the entered email is not valid, show an alert
            alert("Please enter a valid email address");
        }
        setIsPopUpOpen(false); // Close the pop-up after submission
    };

    // Function to validate email format
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    // Function to toggle chatbot visibility
    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };





    return (
        <div className='fullscreen-container' style={{ backgroundImage: 'url(loginimage.jpg)', position: 'absolute' }}>
            <div className='login-container forms'>
                <div className='form-container'>
                    <h2 className='logintitle text-center '>Login Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="clearable-text-field">
                        <label htmlFor='password'>UserName:</label>
                            <input
                                type="text"
                                value={email}
                                onChange={handleChange}
                                placeholder="Please Enter Valid Email"
                                maxLength={33}
                            /><span className='emailclearicon'>
                                {email && <FontAwesomeIcon icon={faTimes} onClick={() => setEmail('')} />} {/* Clear icon */}
                            </span>
                        </div>
                        {error.email && <div className='error'>{error.email}</div>}
                        <div className="clearable-text-field">
                            <label htmlFor='password'>Password:</label>
                            <div className='password-input'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    value={password}
                                    className='width'
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Please Enter Valid Password'
                                    maxLength={33}
                                /><span className='passwordeyeicon'>
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        onClick={togglePasswordVisibility}
                                        className='password-toggle-icon'
                                    // style={{top:'16px',left:'83%'}}
                                    />
                                </span>

                                <span className='passwordclearicon'>
                                    {password && <FontAwesomeIcon icon={faTimes} onClick={() => setPassword('')} />} {/* Clear icon */}
                                </span>
                                {error.password && <div className='error'>{error.password}</div>}
                            </div>
                        </div>
                        <div>
                            <div className="container">
                                <div className="wrapper">
                                    <canvas ref={canvasRef}
                                        width="200"
                                        height="40">
                                    </canvas>
                                    <button type="button" onClick={
                                        () => initializeCaptcha(
                                            canvasRef.current.getContext('2d'))} className="btn btn-primary ReloadBtn">Reload</button>
                                </div>
                                <input
                                className='mb-3'
                                    type="text"
                                    id="user-input"
                                    placeholder="Enter the text in the image"
                                    value={userInput}
                                    onChange={handleUserInputChange} />
                            </div>
                        </div>
                        <div className="text-center">
                        <button type="submit" disabled={!isFormValid || userInput.toUpperCase() !== captchaText.toUpperCase()} className="btn btn-primary text">Login</button>
                            <span>&nbsp;</span>
                            <span>&nbsp;</span>
                            <button type="button" onClick={() => setIsPopUpOpen(true)} className="btn btn-primary text">Forget Password?</button>
                            <span>&nbsp;</span>
                            <span>&nbsp;</span>
                            <span>&nbsp;</span>
                            {/* <br></br><button type="button" className="btn btn-primary text">Login with OTP</button> */}
                        </div>
                        <span>&nbsp;</span>

                        <div>
                            <p className="mt-3 text-center">Don't have an account? <Link to="/NewPage" className="text-black-50 fw-bold">Sign Up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            {/* Render the PopUp component conditionally based on isPopUpOpen state */}
            {isPopUpOpen && (
                <PopUp
                    title="Forgot Password"
                    content={
                        <form onSubmit={handleForgotPasswordSubmit}>
                            <div className='form-group'>
                                "If you have forgotten your password you can reset it here."<br></br>
                                {/* <label htmlFor='forgotPasswordEmail'>Email:</label> */}
                                <input
                                    className='form-control width'
                                    type='email'
                                    id='forgotPasswordEmail'
                                    value={forgotPasswordEmail}
                                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                    placeholder='Enter your email'
                                />
                            </div>
                            <button type="submit" className="btn btn-primary text">Submit</button>

                            {otp && (
                                <div className="form-group">
                                    <label htmlFor='otp'>OTP:</label>
                                    <input
                                        type='text'
                                        id='otp'
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder='Enter OTP'
                                    />
                                </div>
                            )}
                        </form>
                    }
                    handleClose={handleClosePopUp}
                />
            )}
            {/* Render the Chatbot component conditionally based on showChatbot state */}
            {showChatbot && <Chatbot />}
            {/* Toggle button for Chatbot */}
            <button className="toggle-chatbot-btn" onClick={toggleChatbot}>
                {showChatbot ? "Hide Chatbot" : "Show Chatbot"}
            </button>
        </div>
    );
}


export default Login;
