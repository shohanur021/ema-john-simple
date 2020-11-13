import React from 'react';
import { Link } from 'react-router-dom';
import cartcss from './Cart.css';

const Cart = (props) => {
    //console.log(props.carts);
    const totalPrice = props.carts.reduce((accumulator,currentvalue) => {
        return accumulator+currentvalue.price;
    },0);

let shippingCost=0;
if(totalPrice>100){
    shippingCost=15;
}
else if(totalPrice>0){
    shippingCost=6;
}

const tax=Math.round(totalPrice*10/100);

    return (
        <div>
            <h3>Order Summary</h3>
            <p>Items ordered : {
            props.carts.length}</p>
            <p>Price : {totalPrice.toFixed(2)}</p>
            <p>Shiping cost:{shippingCost}</p>
            <p>Tax : {tax}</p>
            <p style={{color:'red',fontWeight:'500'}}>Total price : {Math.round(totalPrice + shippingCost + tax)}</p>
            <Link to="/order_Review">
               <button>review</button>
            </Link>
        </div>
    );
};

export default Cart;