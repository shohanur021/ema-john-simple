import React from 'react';
import logo from '../../images/logo.png';
import headercss from './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <img src={logo}></img>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/order_Review">Order Review</a>
                <a href="/manage_Inventory">Manage Inventory</a>
            </nav>
        </div>
    );
};

export default Header;