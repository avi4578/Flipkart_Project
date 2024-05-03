import React from 'react'
import { Link } from 'react-router-dom';
import '../PageNotFound404.css';

const PageNotFound404 = () => {
  return (
    <>

<section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-12 text-center">
            <h1 className="text-center pageheader">404 Page Not Found</h1>
              <div className="four_zero_four_bg">
              
              </div>

              <div className="contant_box_404">
                <h3 className="h2">
                  Look like you're lost
                </h3>
                <p>The page you are looking for is not available!</p>
                <a href="/NewPage" NewPage="link_404">NewPage</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
        {/* <ul className="menu">
          <Link to="/NewPage">NewPage</Link>
        </ul>
      </div> */}
    </>
  );
};

export default PageNotFound404
