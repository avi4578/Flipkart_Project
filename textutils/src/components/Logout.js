import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Logout = (props) => {
    const navigate = useNavigate();

    function logout(){
        if (window.confirm("Are you sure you want to logout?")) {
            navigate("/");
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-end" style={{ color: props.mode === 'dark' ? 'white' : '#042743' ,color:'white' }}>
            <span onClick={logout} className="logout-btn ms-5" style={{ position: 'absolute', left: '69%', top: '36%' }}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </span>
        </div>
    );
}

// Define PropTypes for type-checking
Logout.propTypes = {
    mode: PropTypes.string.isRequired // Assuming mode is a required string prop
};

export default Logout;
