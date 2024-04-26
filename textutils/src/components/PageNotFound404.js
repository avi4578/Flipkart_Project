import React from 'react'
import { Link } from 'react-router-dom';
import '../PageNotFound404.css';

const PageNotFound404 = () => {
  return (
    <>
       <section>
        <div className="container1">
          <div className="text">
            <h1>Page Not Found</h1>
            <p>We can't seem to find the page you're looking for. Please check the URL for any typos.</p>
            <div className="input-box">
              <input type="text" placeholder="Search..." />
              <button><i className="fa-solid fa-search"></i></button>
            </div>
            <ul className="menu">
              <Link to="/NewPage">Login</Link>
            </ul>
          </div>
          <div><img className="image" src="errorimg.png" alt="" /></div>
        </div>
      </section>
    </>
  );
};

export default PageNotFound404
