import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setproducts] = useState([]);
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        fetch('https://warm-gorge-41947.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setproducts(data))
    }, [])

    useEffect(() => {
        const savedcart = getDatabaseCart();
        const productKeys = Object.keys(savedcart);
        fetch('https://warm-gorge-41947.herokuapp.com/productsByKeys',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCarts(data))
    }, [])

    const handleAddPruduct = (selectedPd) => {
        //console.log("got id",selectedPd);
        const sameProduct = carts.find(pd => pd.key === selectedPd.key)
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = carts.filter(pd => pd.key !== selectedPd.key)
            newCart = [...others, sameProduct];
        }
        else {
            selectedPd.quantity = 1;
            newCart = [...carts, selectedPd];
        }
        setCarts(newCart);
        addToDatabaseCart(selectedPd.key, count);
    }



    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                        products.map(pd => <Product addToCart={true} dataProducts={pd} handlePruduct={handleAddPruduct} key={pd.key}></Product>)
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