import './App.css';
import { useEffect, useRef, useState } from 'react';
import Colors from './components/Colors';
import DetailsThumb from './components/DetailsThumb';
import productData from './ProductData';

function ProductDetail() {
  const [index, setIndex] = useState(0);
  const [product, setProduct] = useState(null); // State to hold the product data
  const smImgsRef = useRef(null);

  const handleImgChange = (newIndex) => {
    setIndex(newIndex);
    const images = smImgsRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[newIndex].className = "active";
  };

  useEffect(() => {
    // Fetch product details from the API
    const fetchProductDetail = async () => {
      try {
        const response = await fetch('http://192.168.0.180:8000/get_product_with_id/1'); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetail();
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    if (product && smImgsRef.current) {
      smImgsRef.current.children[index].className = "active";
    }
  }, [product, index]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className='app'>
      <div className="details">
        <div className='large-img-wrapper'>
          <img src={product.image} alt="largeImg" className='large-img' />
        </div>

        <div className='box'>
          <div className='row'>
            <h2>{product.title}</h2>
            <span>{product.price} $</span>
          </div>
          <div className='row'>
            <p>Category: {product.category}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Size: {product.size}</p>
            <p>Product: {product.product}</p>
          </div>
          {/* colors components  */}
          <Colors colors={product.colors} />
          <p>{product.description}</p>
          {/* <p>{content}</p> */}
          {/* small images components */}
          <DetailsThumb images={product.images} handleImgChange={handleImgChange} smImgsRef={smImgsRef} />
          <button className='add-to-cart'>Add to cart</button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
