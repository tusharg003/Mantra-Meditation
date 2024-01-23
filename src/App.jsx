import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AuthPage from './Pages/AuthPage/AuthPage';
import UserPage from './Pages/UserPage/UserPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/auth' element={<AuthPage />}></Route>
      <Route path='/:username' element={<UserPage />}></Route>
    </Routes>
  );
}

export default App;
