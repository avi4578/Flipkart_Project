import React, { useState } from 'react';
import '../EcommerceNavbar.css'; // Import the CSS file
import logo from '../components/Assets/logo.png'
import cart_icon from '../components/Assets/cart_icon.png'

function EComNavbar() {
    return (
        <>
            <nav className=' fixed-top'>
                <input type="checkbox" id="check" />
                <label htmlFor="check" className="checkbtn">
                    <i className="fas fa-bars"></i>
                </label>
                <img src={logo} alt="" />
                <span>Shopper</span>
                <ul>
                    <li><a className="active" href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Login</a></li>
                    <li><a href="#"><img src={cart_icon} alt='' /></a></li>

                </ul>
              
            </nav>
        </>
    )
}

export default EComNavbar