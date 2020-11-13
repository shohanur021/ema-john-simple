import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Header/Shop/Shop';
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


function App() {
  return (
    <div className="App">
       <Header></Header>
       <Router>
         <Switch>
           <Route path='/shop'>
             <Shop></Shop>
           </Route>
           <Route path='/order_Review'>
             <Review></Review>
           </Route>
           <Route path='/manage_Inventory'>
              <Inventory></Inventory>
           </Route>
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
    </div>
  );
}

export default App;
