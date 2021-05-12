import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    
    const {productkey}=useParams();
    const [product,setProduct] = useState({});

    useEffect(() => {
      fetch('https://warm-gorge-41947.herokuapp.com/product/'+productkey)
      .then(res => res.json())
      .then(data => setProduct(data))
    },[productkey])
   
    return ( 
        <div>
            <h1>Your Product Details.</h1>
            <Product dataProducts={product} addToCart={false}></Product>
        </div>
    );
};

export default ProductDetails;