import React, { useState } from 'react';
import fakeData from '../../../fakeData';
import data from '../../../fakeData';
import Cart from '../cart/Cart';
import Product from '../Product/Product';
import shopCss from './Shop.css';

const Shop = () => {
    //console.log(fakeData);
    const first10 = fakeData.slice(0,10);
    const [products,setproducts] = useState(first10);
    const [carts,setcarts]=useState([]);
    const handleAddPruduct = (selectedPd) => {
        //console.log("got id",selectedPd);
        const newCart = [...carts,selectedPd];
        setcarts(newCart);
    }

   

    return (
        <div className="shop-container">
            <div className="product-container">
            <ul>
                {
                   products.map(pd => <Product dataProducts={pd}  handlePruduct={handleAddPruduct}></Product>) 
                }
            </ul>
            </div>
            <div className="cart-container">
               <Cart carts={carts}></Cart>
            </div>
        </div>
    );
};

export default Shop;