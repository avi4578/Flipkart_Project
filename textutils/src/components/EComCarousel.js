import React, { useState } from 'react';
import '../EcommerceNavbar.css'; // Import the CSS file

import { Carousel } from 'react-bootstrap';



function EComCarousel() {
    const ExampleCarouselImage = ({ src, text, height }) => (
        <img
            className="d-block w-100"
            src={src}
            alt={text}
            style={{ height: `${height}px` }}
        />
    );
    return (
        <Carousel interval={1000} style={{ marginTop: '80px' }} controls={false}>
        <Carousel.Item>
            <ExampleCarouselImage src="./image/Fashion.jpg" text="First slide" height={550} />
            <Carousel.Caption>
                {/* <h3>First slide label</h3> */}
                {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <ExampleCarouselImage src="image/Boult Audio Z40.jpg" text="Second slide" height={550} />
            <Carousel.Caption>
                {/* <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <ExampleCarouselImage src="image/shoes.jpg" text="Third slide" height={550} />
            <Carousel.Caption>
                {/* <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <ExampleCarouselImage src="image/Womencollection.jpg" text="Third slide" height={550} />
            <Carousel.Caption>
                {/* <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
    
    )
}

export default EComCarousel