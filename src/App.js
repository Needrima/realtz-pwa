import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Notification from './pages/Notification/Notification';
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { Provider, useDispatch } from 'react-redux';
import { syncSession } from './redux/Actions';
import { useEffect } from 'react';
import Store from './redux/Store';
import UserProfile from './pages/UserProfile/UserProfile';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Explore from './pages/Explore/Explore';
import AddProduct from './pages/AddProduct/AddProduct';
import Terms from './pages/Terms/Terms';
import Privacy from './pages/PrivacyPolicy/Privacy';
import Settings from './pages/Settings/Settings';
import Account from './pages/Settings/Account/Account';
import UserInformation from './pages/Settings/Account/UserInformation';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      const data = {};
      data['user'] = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
      data['token'] = localStorage.getItem('token') ? localStorage.getItem('token') : '';
      data['isLoggedIn'] = !!(data['user'] && data['token']);
      dispatch(syncSession(data))
  }, []);

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const loggedIn = !!(token && user);

  const handleRedirectToLogin = () => {
    if (loggedIn) {
      return <Navigate replace={true} to="/home" />;
    } else {
      return <Login />;
    }
  };

  const handleRedirectToSignup = () => {
    if (loggedIn) {
      return <Navigate replace={true} to="/home" />;
    } else {
      return <Signup />;
    }
  };

  const handleRedirectToForgotPassword = () => {
    if (loggedIn) {
      return <Navigate replace={true} to="/home" />;
    } else {
      return <ForgotPassword />;
    }
  };

  const handleRedirectToLandingPage = () => {
    if (loggedIn) {
      return <Navigate replace={true} to="/home" />;
    } else {
      return <LandingPage />;
    }
  };

  const handleRedirectToProfile = () => {
    if (loggedIn) {
      const userObj = JSON.parse(user);
      return <Navigate to={`/profile/${userObj?.reference}`} />;
    } else {
      return <Navigate replace={true} to="/login" />;
    }
  }

  const handleRedirectToSavedProduct = () => {
    if (loggedIn) {
      const userObj = JSON.parse(user);
      return <Navigate to={`/products?type=saved&reference=${userObj?.reference}`} />;
    } else {
      return <Navigate replace={true} to="/login" />;
    }
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={handleRedirectToLandingPage()} />
        <Route path='/login' element={handleRedirectToLogin()} />
        <Route path='/signup' element={handleRedirectToSignup()} />
        <Route path="/forgot-password" element={handleRedirectToForgotPassword()} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile/:reference' element={<UserProfile />} />
        <Route path='/product/:reference' element={<SingleProduct />} />
        <Route path='/product-details/:reference' element={<ProductDetails />} />
        <Route path='/notifications' element={<Notification />} />
        <Route path='/profile' element={handleRedirectToProfile()} />
        <Route path='/saved' element={handleRedirectToSavedProduct()} />
        <Route path='/products' element={<Products />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/settings/account' element={<Account />} />
        <Route path='/settings/account/user-information' element={<UserInformation />} />
      </Routes>
    </div>
  );
}

const AppWrapper = () => {

  return (
    <Provider store={Store}>
      <App /> 
    </Provider>
  )
}

export default AppWrapper;
