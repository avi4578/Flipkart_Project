import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [title,settitle]=useState('');

  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        const response = await axios.get(`http://192.168.0.180:8000/get_product_with_id/1`);
        if (response.data.status) {
        } else {
            console.error(response.data.message || 'Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching document:', error.response ? error.response.data : error.message);
    }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, description, price, images } = product;

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
    setColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  return (
    <div className="product-detail">
      {/* Check if images array exists and has at least one element */}
      {images && images.length > 0 && (
        <img src={images[0]} alt="Product" style={{ maxWidth: '100%', height: 'auto' }} />
      )}

      <div className="product-details">
        <h2>{name}</h2>
        <p>title: {title}</p>
        <p>Price: ${price}</p>

        <label htmlFor="qty">Quantity:</label>
        <input type="number" id="qty" value={qty} onChange={handleQtyChange} style={{ marginBottom: '10px' }} />

        <label htmlFor="color">Color:</label>
        <select id="color" value={color} onChange={handleColorChange} style={{ marginBottom: '10px' }}>
          <option value="">Select Color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>

        <label htmlFor="size">Size:</label>
        <select id="size" value={size} onChange={handleSizeChange} style={{ marginBottom: '10px' }}>
          <option value="">Select Size</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <button onClick={handleAddToCart} style={{ marginRight: '10px' }}>Add to Cart</button>
        <button onClick={handleAddToWishlist}>Add to Wishlist</button>
      </div>
    </div>
  );
};

export default ProductDetail;
