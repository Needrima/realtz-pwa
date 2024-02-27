import './App.css';
import {Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return (
    <div className='px-2 pt-5 pb-3'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/landing' element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
