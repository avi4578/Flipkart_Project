import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Logout from './Logout';
import './Navbar.css'; // Import your CSS file for navbar styling
import { bounce } from 'react-animations';

export default function Navbar(props) {
    return (
        <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} fixed-top`} style={{ borderBlock: '4px solid white', width: '100%',padding:'15px' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">{props.title}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li style={{ paddingLeft: "8px" ,paddingRight: "20px"}}>
                            <a href='/Textmodel' style={{ color: "white", textDecoration: 'none' }} >Home</a>
                        </li>
                        <li style={{ paddingLeft: "8px" ,paddingRight: "20px"}}>
                            {/* <Link className="nav-link" href="/">{props.aboutText}</Link> */}
                            <a href='/about' style={{ color: "white", textDecoration: 'none' }}>{props.aboutText}</a>
                        </li>
                        {/* <li style={{ paddingLeft: "8px" }}>
                            <a href='/Homepage' style={{ color: "white", textDecoration: 'none' }}>Homepage</a>
                        </li> */}
                        {/* <li style={{ paddingLeft: "8px" }}>
                            <a href='/ResponsiveVideoPlayer' style={{ color: "white", textDecoration: 'none' }}>ResponsiveVideoPlayer</a>
                        </li> */}
                        {/* <li style={{ paddingLeft: "8px" }}>
                            <a href='/Curdoperationinform' style={{ color: "white", textDecoration: 'none' }}>Curdoperationinform</a>
                        </li> */}
                       
                        <li style={{ paddingLeft: "8px" ,paddingRight: "20px"}}>
                            <a href='/ProductDetail' style={{ color: "white", textDecoration: 'none' }}>ProductDetail</a>
                        </li>

                        <li style={{ paddingLeft: "8px" ,paddingRight: "20px"}}>
                            <a href='/EcommerceNavbar' style={{ color: "white", textDecoration: 'none' }}>EcommerceNavbar</a>
                        </li>
                        <li style={{ paddingLeft: "8px" ,paddingRight: "20px"}}>
                            <a href='/EcommerceCurdoperationinform' style={{ color: "white", textDecoration: 'none' }}>EcommerceCrudoperationinform</a>
                        </li>

                        <Logout />
                    </ul>

                    <div className={`form-check mt-2 form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                        <input className="form-check-input" onClick={props.toggleMode} type="checkbox" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable DarkMode</label>
                    </div>



                    
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    aboutText: PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title: 'TESTAPP',
    aboutText: 'About'
};