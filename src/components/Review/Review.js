import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Items from '../ReviewItem/Items';
import  Cart from '../Header/cart/Cart'


const Review = () => {
    const [cart,setcart]=useState([]);
    const removeproduct = ((key) => {
       const removeCart = cart.filter(pd => pd.key !== key);
       setcart(removeCart );
       removeFromDatabaseCart(key);
    })

    useEffect(() => {
        const saveCart = getDatabaseCart();
        console.log(saveCart);
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
        <div style={{display:"flex"}}>
            <div style={{width : "70%"}}>
              <h2>There have {cart.length} items</h2> 
              <Items product={cart} removeItem={removeproduct}></Items>
            </div>
            <div>
              <Cart carts={cart}></Cart>
            </div>
             
        </div>
    );
};

export default Review;