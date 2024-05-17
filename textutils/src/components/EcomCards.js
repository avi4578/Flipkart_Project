import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../components/EcomCards.css'; // Import the CSS file

function EcomCards() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const baseurl = "http://192.168.0.210:8000/media/documents/doc/";
    const navigate = useNavigate();


    const fetchData = async () => {
        try {
            const response = await fetch('http://192.168.0.210:8000/fetchproductData');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setProducts(data.data);
            setFilteredProducts(data.data); // Initially set filtered products to all products
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleItemClick = (id) => {
        navigate(`/ProductDetail/${id}`, { state: { data: products.find(product => product.Id === id) } });
    };

    const filterItem = (category) => {
        console.log("category=>", category);
        const newFilteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
        setFilteredProducts(newFilteredProducts);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {/* <h1 className="col-12 text-center my-3 fw-bold">Products Filtering App</h1> */}

                    <div className="col-12 text-center my-3">
                        <Button onClick={() => filterItem('all')} variant="primary"><h1>All</h1></Button>{' '}
                        <Button onClick={() => filterItem('Men')} variant="secondary"><h1>Mens</h1></Button>{' '}
                        <Button onClick={() => filterItem('Women')} variant="dark"><h1>Womens</h1></Button>{' '}
                        <Button onClick={() => filterItem('Kids')} variant="danger"><h1>Kids</h1></Button>{' '}
                        <Button onClick={() => filterItem('Electronics')} variant="info"><h1>Electronics</h1></Button>
                    </div>
                </div>
                {/* Render your filtered products here */}
                {/* Example: */}
                {filteredProducts.map(product => (
                    <div key={product.id}>{product.name}</div>
                ))}
            </div>
            <div>
                <Row xs={{ cols: 1 }} md={{ cols: 2 }} lg={{ cols: 4 }} className="g-4 mt-2">
                    {filteredProducts.map(product => (
                        <Col xs key={product.Id} onClick={() => handleItemClick(product.Id)}>
                            <Card className="cardheight" style={{ marginLeft: '10px', cursor: 'pointer', border: '3px solid #0082e6' }}>
                                <Card.Img src={`${baseurl}/${product.image}`} alt={product.title} className="imgheight" />
                                <Card.Body>
                                    <label><b>Product Title:</b></label>
                                    <Card.Title className="truncate1">{product.title}</Card.Title>
                                    <label><b>Description:</b></label>
                                    <Card.Text className="truncate">
                                        {product.description}
                                    </Card.Text>
                                    <Button variant="success" color="link" onClick={() => handleItemClick(product.Id)}>
                                        Read More
                                    </Button>
                                    <br />
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-body-secondary text-danger">Last updated {product.lastupdated}</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
}

export default EcomCards;
