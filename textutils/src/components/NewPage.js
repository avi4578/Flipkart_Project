import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'; // Import brand icons
import '../signup.css'; // Import the CSS file
import { countries } from 'countries-list';
import countryCodes from 'country-codes-list'; // Import country codes
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { apibaseurl } from './Constant';


const NewPage = () => {
    const [fullName, setFullName] = useState('');
    const fullNameInputRef = useRef(null); // Ref for full name input field
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword1, setShowPassword1] = useState(false); // first password field
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword2, setShowPassword2] = useState(false); // second password field
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [mobilenumber, setnumber] = useState('')
    const [error, setError] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    // State variables for tracking selected gender
    const [gender, setGender] = useState('male'); // Set default gender to 'male'
    const [country, setCountry] = useState(''); // Default country is INDIA
    const [countryCode, setCountryCode] = useState(''); // Default country code is +91


    useEffect(() => {
        // Check if the ref is assigned and the input field exists before focusing
        if (fullNameInputRef.current) {
            fullNameInputRef.current.focus();
        }
    }, []); // Empty dependency array ensures this effect runs only once after initial render


    const handleSocialLogin = (provider) => {
        // Redirect to respective authentication page based on provider
        switch (provider) {
            case 'instagram':
                window.location.href = 'https://www.instagram.com/accounts/login/?hl=en';
                break;
            case 'facebook':
                window.location.href = 'https://www.facebook.com/campaign/landing.php?campaign_id=14884913640&extra_1=s%7Cc%7C589460569678%7Cb%7Cface%20book%20com%7C&placement=&creative=589460569678&keyword=face%20book%20com&partner_id=googlesem&extra_2=campaignid%3D14884913640%26adgroupid%3D128696221352%26matchtype%3Db%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-923911541%26loc_physical_ms%3D9062211%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gad_source=1&gclid=Cj0KCQjwiMmwBhDmARIsABeQ7xSCqDAJulM5n8dfdHYkoOj6JgVsr07aOHxWAwuoGVmVRiWP3yeMZPcaAvStEALw_wcB';
                break;
            case 'gmail':
                window.location.href = 'https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dsign_in_no_continue%26pli%3D1&ec=GAlAwAE&hl=en_GB&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S-49388105%3A1712517442544181&theme=mn&ddm=0';
                break;
            default:
                break;
        }
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibility2 = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleChange = (event) => {
        event.target.value.replace(/[^\d]/g, '');
        setnumber(event.target.value);
    };

    const handlePaste = (e) => {
        e.preventDefault(); // Prevent the default paste behavior
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if the user has selected a country
        if (!country) {
            toast.error('Please select a country');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }

        // Validate if the user has selected a country code
        if (!countryCode) {
            toast.error('Please select a country code');
            // setError({ ...error, countryCode: 'Please select a country code' });

            return;
        }

        // Validate mobile number length
        if (mobilenumber.length !== 10) {
            toast.error('Mobile number should be 10 digits');
            // setError({ ...error, mobilenumber: 'Mobile number should be 10 digits' });

            return;
        }

        // Validate password
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            // setPasswordError('Passwords do not match');

            return;
        }

        // Set loading to true to show spinner
        setLoading(true);
        toast.success('Signup successful!');

        // Create payload
        const payload = {
            fullname: fullName,
            email: email,
            password: password,
            confirmpassword: confirmPassword,
            mobilenumber: mobilenumber,
            gender: gender,
            countryCode: countryCode,
            mobilenumber: mobilenumber,
            country: country // Combine country code and mobile number
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));

        // Send POST request
        axios.post(`http://192.168.0.180:8000/signup`, formData)
        // axios.post(`${apibaseurl}/signup`, formData)
            .then(response => {
                setLoading(false); // Hide spinner

                if (response.data.status === false) {
                    alert(response.data.message);
                    // Clear form fields
                    setFullName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setnumber('');
                    setCountry('');
                    setCountryCode('');
                    setGender('');
                } else {
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
        <>
            <style>
                {`
            body {
                overflow-x:hidden;

            }
            body {
            
            }
            .bgimage{
                background-image: url('Signupform.jpg');
                /* Ensure correct path to your image */
                
                height: 100vh; /* Ensure the background covers the entire viewport */
            }
            .img2{
                height: 100vh;
                width:102%;
            }

            @media screen and (max-width: 1024px) {
                .img2{
            
                
                height: 140vh; 
                width:104%;
                }
            
            }
            @media screen and (min-width: 1025px) {
                .img2{
                
                height: 128vh; /* Ensure the background covers the entire viewport */
                }
            }
            @media screen and (max-width: 1024px) {
                .bgimage{
                background-image: url('Signupform.jpg');
                /* Ensure correct path to your image */
                
                height: 140vh; /* Ensure the background covers the entire viewport */
                }
            
            }
            @media screen and (min-width: 1025px) {
                .bgimage{
                background-image: url('Signupform.jpg');
                /* Ensure correct path to your image */
                
                height: 128vh; /* Ensure the background covers the entire viewport */
                }
            }
            `}
            </style>
            {loading && (
                <div className="overlay">
                    <Spinner animation="border" />
                </div>
            )}
            <div>
                <div className="row">
                    <div className="col-12 col-md-6 col-sm-6 .col-lg-6 .col-xs-12 img1 " >
                        <img src="..\signuplogo.jpg" className='img2' />
                    </div>
                    <div className="col-12 col-md-6 col-sm-6 .col-lg-6 .col-xs-12 signup bgimage" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="signup-container box1">
                            <form onSubmit={handleSubmit} className="signup-form">
                                <div className="form-group formpad">
                                    <h2 className='Signuptitle text-center'>SignUp Form</h2>
                                    <input
                                        type="text"
                                        placeholder="Enter Your Full Name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        maxLength={25}
                                        required
                                        autoFocus // Set autofocus here
                                    />
                                </div>
                                <div className="form-group formpad">
                                    <input
                                        type="email"
                                        placeholder="Enter Email-ID"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group formpad">
                                    <label className='mr-2'><span>Gender:</span></label>

                                    <label className='radiobtn ml-2' style={{ marginRight: '8px', marginLeft: '3px' }}>
                                        <input
                                            className='radio1'
                                            type="radio"
                                            value="male"
                                            checked={gender === 'male'}
                                            onChange={handleGenderChange}
                                        />
                                        <span>Male</span>
                                    </label>
                                    <label className='radiobtn'>
                                        <input
                                            className='radio1'
                                            type="radio"
                                            value="female"
                                            checked={gender === 'female'}
                                            onChange={handleGenderChange}
                                        />
                                        <span>Female</span>
                                    </label>

                                </div>
                                <div className="form-group formpad">
                                    <div className='input-group'>
                                        <input
                                            type={showPassword1 ? "text" : "password"}
                                            placeholder="Enter Your Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onPaste={handlePaste}
                                            maxLength={15}
                                            required
                                        />
                                        <span className='passwordeyeicon1'>
                                            <FontAwesomeIcon
                                                icon={showPassword1 ? faEyeSlash : faEye}
                                                onClick={() => setShowPassword1(!showPassword1)}
                                                className='password-toggle-icon1'
                                            />
                                        </span>
                                        <span className='passwordclearicon1'>
                                            {password && <FontAwesomeIcon icon={faTimes} onClick={() => setPassword('')} />}
                                        </span>
                                        {error.password && <div className='error'>{error.password}</div>}
                                    </div>
                                </div>

                                <div className="form-group formpad">
                                    <div className="country-code-field">
                                        <select className='dropbuttonhandle' value={country} onChange={(e) => setCountry(e.target.value)} >
                                            <option value="">Select Country</option>
                                            {Object.keys(countries).map((countryCode) => (
                                                <option key={countryCode} value={countryCode}>
                                                    {countries[countryCode].emoji} {countries[countryCode].name}
                                                </option>
                                            ))}
                                        </select>
                                        {error.country && <div className='error'>{error.country}</div>}
                                    </div>
                                    <select className="countrycode" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                                        <option value="">Select Country Code</option>
                                        {Object.entries(countryCodes.customList('countryCode', '[{countryCode}] {countryNameEn}: +{countryCallingCode}')).map(([key, value]) => (
                                            <option key={key} value={value}>{value}</option>
                                        ))}
                                    </select>
                                    {error.countryCode && <div className='error'>{error.countryCode}</div>}
                                    <input
                                        className="mobilenumber"
                                        id="inputBox"
                                        type="number"
                                        placeholder="Enter Valid Mobile Number"
                                        value={mobilenumber}
                                        onChange={handleChange}
                                        // onChange={validation}
                                        required
                                        maxLength={10}
                                    />
                                    {/* {error.mobilenumber && <div className='error'>{error.mobilenumber}</div>} */}
                                </div>
                                <div className="form-group formpad">
                                    <div className='input-group'>
                                        <input
                                            type={showPassword2 ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            onPaste={handlePaste}
                                            maxLength={15}
                                            required
                                        />
                                        <span className='passwordeyeicon2'>
                                            <FontAwesomeIcon
                                                icon={showPassword2 ? faEyeSlash : faEye}
                                                onClick={() => setShowPassword2(!showPassword2)}
                                                className='password-toggle-icon2'
                                            />
                                        </span>
                                        <span className='passwordclearicon2'>
                                            {confirmPassword && <FontAwesomeIcon icon={faTimes} onClick={() => setConfirmPassword('')} />}
                                        </span>
                                    </div>
                                </div>

                                <button type="submit" className="signup-button">Sign Up</button>
                            </form>
                            <ToastContainer />

                            <p className="login-link">Already have an account? <Link to="/">Login</Link></p>
                            {/* Social media login options */}
                            <div className="social-login">
                                <p>Or sign up using</p>
                                <div className="social-icons">
                                    {/* Instagram login */}
                                    <FontAwesomeIcon icon={faInstagram} size="2x" onClick={() => handleSocialLogin('instagram')} style={{ color: '#bc2a8d', cursor: 'pointer', marginRight: '20px' }}
                                    />
                                    {/* Facebook login */}
                                    <FontAwesomeIcon icon={faFacebook} size="2x" onClick={() => handleSocialLogin('facebook')} style={{ color: '#1877F2', cursor: 'pointer', marginRight: '20px' }} />

                                    {/* Gmail login */}
                                    <FontAwesomeIcon icon={faGoogle} size="2x" onClick={() => handleSocialLogin('gmail')} style={{ color: '#D44638', cursor: 'pointer' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewPage;