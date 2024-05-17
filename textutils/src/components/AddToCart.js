import React, { useState, useEffect } from 'react';

function AddToCart() {

    const handleAddToCart = async () => {

        // Implement add to cart functionality here
        navigate(`/AddToCart/${id}`, { state: { data: products.find(product => product.Id === id) } });

        // try {
        //     const response = await fetch('http://192.168.0.210:8000/Add_To_Cart');
        //     if (!response.ok) {
        //         throw new Error('Failed to fetch data');
        //     }
        //     const data = await response.json();
        //     setProducts(data.data);
        //     console.log(response.data.data);

        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // }


    };

    return (
        <>
            <div className='product-buttons'>
                <button className='btn btn-success' onClick={handleAddToCart} style={{ fontSize: '26px', marginRight: '10px', border: '2px solid black' }}>
                    Add to Cart
                </button>
            </div>
        </>
    )

}


export default AddToCart