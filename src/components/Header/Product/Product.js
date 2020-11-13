import React from 'react';
import productCss from './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (probs) => {
   // console.log(probs.dataProducts);
   const {img,name,seller,price,stock,key} = probs.dataProducts;

    return (
        <div className="product">
            <div className="imagePd">
               <img src={img}></img>
            </div>
            <div className="detailsPd">
               <h4><Link to={"/product/"+key}>{name}</Link></h4>
               <br></br>
               <p><small>By : {seller}</small></p>
               <br></br>
               <p>${price}</p>
               <p><small>Only {stock} left in stock  -- <span>Order Soon</span></small></p>
              {probs.addToCart && <button className="main-button" onClick={() => probs.handlePruduct(probs.dataProducts)}> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
             
            </div>     
        </div>
    );
};

export default Product;