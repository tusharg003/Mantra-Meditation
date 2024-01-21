import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AuthPage from './Pages/AuthPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/auth' element={<AuthPage />}></Route>
    </Routes>
  );
};
export default App;
