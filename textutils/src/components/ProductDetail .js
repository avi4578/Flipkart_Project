import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import EcommerceNavbar from './EComNavbar';

const ProductDetail = () => {
  const [qty, setQty] = useState(1);
  const [colour, setColour] = useState('');
  const [size, setSize] = useState('');
  const baseurl = "http://192.168.0.210:8000/media/documents/doc/";
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const location = useLocation();
  const { data } = location.state;

  useEffect(() => {
    if (location.state && location.state.productData) {
      const { name, description, price, colour, size } = location.state.productData;
      setName(name);
      setDescription(description);
      setPrice(price);
      setColour(colour);
      setSize(size);
    }
  }, [location.state]);

  const handleAddToCart = () => {
    // Implement add to cart functionality here
  };

  const handleAddToWishlist = () => {
    // Implement add to wishlist functionality here
  };

  const handleQtyChange = (e) => {
    setQty(parseInt(e.target.value));
  };

  const handleColorChange = (e) => {
    setColour(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const renderQuantityOptions = () => {
    const options = [];
    for (let i = 1; i <= 10; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  return (
    <>
      <EcommerceNavbar />
      <div className='container'>
        <Row style={{ marginTop: '155px' }}>
          <Col md={4}>
            <div className='product-image'>
              <img
                src={`${baseurl}/${data.image}`}
                alt="largeImg"
                className='large-img'
                style={{ maxWidth: '100%', maxHeight: '340px' }}
              />
            </div>
          </Col>

          <Col md={8}>
            <div className='product-details' style={{ fontSize: '19px' }}>
              <h2 className='title' style={{ fontSize: '25px' }}>
                {data.title}</h2>
              <label><b>Description:</b></label>
              <p>{data.description}</p>
              <p style={{ color: 'Red' }}><b>Price:</b>: ${data.price}</p>

              {/* <Form.Group controlId="qty">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control as="select" value={qty} onChange={handleQtyChange}>
                  {renderQuantityOptions()}
                </Form.Control>
              </Form.Group> */}

              <Form.Group controlId="colour">
                <Form.Label>colour:</Form.Label>
                <Form.Control as="select" value={data.colour} onChange={handleColorChange}>
                  <option value="">Select Colour</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="size">
                <Form.Label>Size:</Form.Label>
                <Form.Control as="select" value={data.size} onChange={handleSizeChange}>
                  <option value="">Select Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </Form.Control>
              </Form.Group>

              <div className='product-buttons'>
                <Button variant='success' onClick={handleAddToCart} style={{ fontSize: '26px', marginRight: '10px', border: '2px solid black' }}>
                  Add to Cart
                </Button>
                <Button variant='primary' onClick={handleAddToWishlist} style={{ fontSize: '26px', border: '2px solid black' }}>
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductDetail;
