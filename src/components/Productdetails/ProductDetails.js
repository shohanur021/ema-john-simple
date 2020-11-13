import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Header/Product/Product';

const ProductDetails = () => {
   // console.log(fakeData);
    const {productkey}=useParams();
    const product = fakeData.find(pd => productkey === pd.key);
    //console.log(product);
    return (
        <div>
            <h1>{productkey}is coming sooooon</h1>
            <Product dataProducts={product} addToCart={false}></Product>
        </div>
    );
};

export default ProductDetails;