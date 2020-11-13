import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import Items from '../ReviewItem/Items';


const Review = () => {
    const [cart,setcart]=useState([]);

    useEffect(() => {
        const saveCart = getDatabaseCart();
        //console.log(saveCart);
        const productKey = Object.keys(saveCart);
        //console.log(productKey);
         const cartProducts = productKey.map(key => {
             const product = fakeData.find(pd => pd.key === key);
             product.quantity = saveCart[key];
             return product;
        })
       // console.log(cartProducts);
       setcart(cartProducts);
    },[])

    return (
        <div>
            <h1>This is {cart.length}</h1>
            <Items product={cart}></Items>
        </div>
    );
};

export default Review;