import './styles/App.css'
import Auth from './pages/Auth'
import Register from './pages/Register'
import CommonWall from './pages/Wall';
import {Routes, Route, Navigate} from 'react-router-dom';

function App() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={user ? <Navigate to="/wall" /> : <Auth />} />
        <Route path='/register' element={user ? <Navigate to="/wall" /> : <Register />} />
        <Route path='/wall' element={user ? <CommonWall /> : <Navigate to="/" /> } />
      </Routes>
    </div>
  );
}

export default App;
