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

function App() {
  const dispatch = useDispatch();

  const loggedIn = !!(localStorage.getItem('token') && localStorage.getItem('user'));

  useEffect(() => {
      const data = {};
      data['user'] = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
      data['token'] = localStorage.getItem('token') ? localStorage.getItem('token') : '';
      data['isLoggedIn'] = !!(data['user'] && data['token']);
      dispatch(syncSession(data))
  }, []);

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

  return (
    <div>
      <Routes>
        <Route path='/' element={handleRedirectToLandingPage()} />
        <Route path='/login' element={handleRedirectToLogin()} />
        <Route path='/signup' element={handleRedirectToSignup()} />
        <Route path="/forgot-password" element={handleRedirectToForgotPassword()} />
        <Route path='/home' element={<Home />} />
        <Route path='/notifications' element={<Notification />} />
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
