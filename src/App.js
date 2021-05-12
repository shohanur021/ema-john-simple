import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/Productdetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const  UserContext = createContext();

function App() {
  const [loggedInUser,setloggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser,setloggedInUser]}>
       <h2>Email : {loggedInUser.email}</h2>
       <Router>
       <Header></Header>
         <Switch>
           <Route path='/shop'>
             <Shop></Shop>
           </Route>
           <Route path='/order_Review'>
             <Review></Review>
           </Route>
           <PrivateRoute path='/manage_Inventory'>
              <Inventory></Inventory>
           </PrivateRoute>
           <Route path='/login'>
              <Login></Login>
           </Route>
           <PrivateRoute path='/shipment'>
              <Shipment></Shipment>
           </PrivateRoute>
           <Route exact path='/'>
            <Shop></Shop>
           </Route>
           <Route path='/product/:productkey'>
             <ProductDetails></ProductDetails>
           </Route>
           <Route path='*'>
             <NotFound></NotFound>
           </Route>
         </Switch>
       </Router>
    </UserContext.Provider>
  );
}

export default App;
