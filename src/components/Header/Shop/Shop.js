import React, { useEffect, useState } from 'react';
import fakeData from '../../../fakeData';
import data from '../../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../cart/Cart';
import Product from '../Product/Product';
import shopCss from './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products,setproducts] = useState(first10);
    const [carts,setcarts]=useState([]);
     
    useEffect(() => {
        const savedcart = getDatabaseCart();
        const pruductkeys = Object.keys(savedcart);
        const previousCart = pruductkeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey );
            product.quantity = savedcart[existingKey];
            return product;
        })
        setcarts(previousCart);
},[])

    const handleAddPruduct = (selectedPd) => {
        //console.log("got id",selectedPd);
        const sameProduct = carts.find(pd => pd.key === selectedPd.key)
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity+1;
            sameProduct.quantity=count;
            const others = carts.filter(pd => pd.key !== selectedPd.key)
            newCart = [...others,sameProduct];
        }
        else{
            selectedPd.quantity= 1;
            newCart = [...carts,selectedPd];
        }
        setcarts(newCart);
        addToDatabaseCart(selectedPd.key, count);   
    }

   

    return (
        <div className="shop-container">
            <div className="product-container">
            <ul>
                {
                   products.map(pd => <Product addToCart={true} dataProducts={pd}  handlePruduct={handleAddPruduct} key={pd.key}></Product>) 
                }
            </ul>
            </div>
            <div className="cart-container">
               <Cart carts={carts}>
                  <Link to="/order_Review">
                     <button>review</button>
                  </Link>
               </Cart>
            </div>
        </div>
    );
};

export default Shop;