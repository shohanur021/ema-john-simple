import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import headercss from './Header.css';

const Header = () => {
    const [loggedInUser,setloggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img src={logo}></img>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/order_Review">Order Review</Link>
                <Link to="/manage_Inventory">Manage Inventory</Link>
                <button onClick={() => setloggedInUser({})}>Log Out</button>
            </nav>
        </div>
    );
};

export default Header;