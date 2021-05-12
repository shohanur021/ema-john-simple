import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Items from '../ReviewItem/Items';
import  Cart from '../cart/Cart'
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';


const Review = () => {
    const [cart,setcart]=useState([]);
    const [orderPlace,setorderPlace] = useState(false);
    const history = useHistory();
    const handleProceedCheckout=(() => {
      history.push('/shipment');
    })
    const removeproduct = ((key) => {
       const removeCart = cart.filter(pd => pd.key !== key);
       setcart(removeCart );
       removeFromDatabaseCart(key);
    })

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        fetch('https://warm-gorge-41947.herokuapp.com/productsByKeys',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setcart(data))
    },[])

    let thankyou;
    if(orderPlace){
      thankyou = <img src={happyImage}></img>
    }

    return (
        <div style={{display:"flex"}}>
            <div style={{width : "70%"}}>
              <h2>There have {cart.length} items</h2> 
              <Items product={cart} removeItem={removeproduct}></Items>
              {
               thankyou 
              }
            </div>
            <div>
              <Cart carts={cart}>
                 <button onClick={handleProceedCheckout}>Proceed Checkout</button>
              </Cart>
            </div>
             
        </div>
    );
};

export default Review;