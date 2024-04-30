import React, { useState } from 'react';
import '../EcommerceNavbar.css'; // Import the CSS file
import logo from '../components/Assets/logo.png'
import cart_icon from '../components/Assets/cart_icon.png'
import ExampleCarouselImage from 'react-bootstrap/Carousel';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Import react-bootstrap components
import { CardImg, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';



function EcommerceNavbar() {
    const [menu, setmenu] = useState(null);

    const ExampleCarouselImage = ({ src, text, height }) => (
        <img
            className="d-block w-100"
            src={src}
            alt={text}
            style={{ height: `${height}px` }}
        />
    );

    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
        ProductDetail(); // Call the ProductDetail function when the link is clicked
    };


    const ProductDetail = async () => {
        try {
            const response = await axios.get('http://192.168.0.180:8000/get_product');
            console.log('Product data:', response.data);
            // Handle the response data here, maybe update your UI with the data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    

    return (
        <>
            <div className='navbar'>
                <div className="nav-logo">
                    <img src={logo} alt="" />
                    <p>Shopper</p>
                </div>
                <ul className="nav-menu">
                    <li onClick={() => { setmenu('shop') }}>Shop{menu === "shop" ? <hr /> : <></>}</li>
                    <li onClick={() => { setmenu('mens') }}>Mens{menu === "mens" ? <hr /> : <></>}</li>
                    <li onClick={() => { setmenu('womens') }}>Womens{menu === "womens" ? <hr /> : <></>}</li>
                    <li onClick={() => { setmenu('Kids') }}>Kids{menu === "Kids" ? <hr /> : <></>}</li>
                </ul>
                <div className="nav-login-cart">
                    <button>Login</button>
                    <img src={cart_icon} alt='' />
                    <div className="nav-cart-count"></div>
                </div>
            </div>
            <Carousel interval={1500}>
                <Carousel.Item>
                    <ExampleCarouselImage src="image/Fashion.jpg" text="Second slide" height={550} />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <ExampleCarouselImage src="./image/Mencollection.jpg" text="First slide" height={550} />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <ExampleCarouselImage src="image/product.jpg" text="Second slide" height={550} />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <ExampleCarouselImage src="image/shoes.jpg" text="Third slide" height={550} />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <ExampleCarouselImage src="image/Womencollection.jpg" text="Third slide" height={550} />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>




            <Row xs={{ cols: 1 }} md={{ cols: 4 }} className="g-4 mt-2">
                <Col xs>
                    <Card className="cardheight border border-dark" style={{ marginLeft: '10px' }}>
                        <CardImg src="./image/juice.jpg" alt="React Image" className="imgheight" />
                        <CardBody>
                            <CardTitle>Orange 100% Natural & Real Fruit  </CardTitle>
                            <CardText>
                                Rehydration Drink Orange 100% Natural & Real Fruit
                                No Added Sugar or Preservatives
                                No artificial colours or flavours
                                {showDetails && (
                                    <>
                                        <br />
                                        Additional details can go here.
                                    </>
                                )}

                            </CardText>
                            {!showDetails && (
                                <Button variant="outline-dark" color="link" >
                                    <Link to="/ProductDetail"  className="btn btn-primary">ProductDetail</Link>
                                </Button>

                            )}
                            <br />


                        </CardBody>
                        <CardFooter>
                            <small className="text-body-secondary text-danger">Last updated 3 mins ago</small>
                        </CardFooter>
                    </Card>

                </Col>
                <Col xs>
                    <Card className="cardheight border border-dark">
                        <CardImg src="./image/skin.jpg" alt="React Image" className="imgheight" /> {/* Replace ReactImg with your image source */}
                        <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardText>
                                This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer Homepage.
                                {showDetails && (
                                    <>
                                        <br />
                                        Additional details can go here.
                                    </>
                                )}

                            </CardText>
                            {!showDetails && (
                                <Button variant="outline-dark" color="link" onClick={toggleDetails}>
                                    <Link to="/ProductDetail" className="btn btn-primary">ProductDetail </Link>
                                </Button>

                            )}
                        </CardBody>
                        <CardFooter>
                            <small className="text-body-secondary text-danger">Last updated 3 mins ago</small>
                        </CardFooter>
                    </Card>
                </Col>
                <Col xs>
                    <Card className="cardheight border border-dark">
                        <CardImg src="./image/Skincare.jpg" alt="React Image" className="imgheight" /> {/* Replace ReactImg with your image source */}
                        <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardText>
                                This is a wider card with Homepage supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                {showDetails && (
                                    <>
                                        <br />
                                        Additional details can go here.
                                    </>
                                )}
                            </CardText>
                            {!showDetails && (
                                <Button variant="outline-dark" color="link" onClick={toggleDetails}>
                                    <Link to="/ProductDetail" className="btn btn-primary">ProductDetail </Link>
                                </Button>

                            )}
                        </CardBody>

                        <CardFooter>
                            <small className="text-body-secondary text-danger">Last updated 3 mins ago</small>
                        </CardFooter>
                    </Card>
                </Col>
                <Col xs>
                    <Card className="cardheight border border-dark">
                        <CardImg src="./image/Boult Audio Z40.jpg" alt="React Image" className="imgheight" /> {/* Replace ReactImg with your image source */}
                        <CardBody>
                            <CardTitle>Boult Audio Z40</CardTitle>
                            <CardText>
                                Boult Audio Z40 True Wireless in Ear Earbuds with 60H Playtime,
                                Zen™ ENC Mic, Low Latency Gaming, Type-C Fast Charging.
                                {showDetails && (
                                    <>
                                        <br />
                                        Additional details can go here.
                                    </>
                                )}
                            </CardText>
                            {!showDetails && (
                                <Button variant="outline-dark" color="link" onClick={toggleDetails}>
                                    <Link to="/ProductDetail" className="btn btn-primary">ProductDetail </Link>
                                </Button>

                            )}
                        </CardBody>

                        <CardFooter>
                            <small className="text-body-secondary text-danger">Last updated 3 mins ago</small>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default EcommerceNavbar