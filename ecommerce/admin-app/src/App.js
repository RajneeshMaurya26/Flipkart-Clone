import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './containers/Home/index';
import Signin from './containers/Signin/Signin';
import Signup from './containers/Signup/Signup';
import PrivateRoute from './components/HOC/PrivateRoute'; // Import your PrivateRoute component
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn,getAllCategory } from './actions';
import Product from './containers/Products/products';
import Category from './containers/Category/category';
import Order from './containers/Orders/orders';

function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
 
  useEffect(() => {
    if (!auth.authenticate) dispatch(isLoggedIn());
    dispatch(getAllCategory());
  }, [auth.authenticate,dispatch]);

  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product/>} />
        <Route path="/category" element={<Category/>} />
        <Route path="/orders" element={<Order/>} />
      </Route>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

    </Routes>
  );
}

export default App;
