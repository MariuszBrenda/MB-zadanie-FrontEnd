import './App.css';
import Navbar from './components/Navbar';
import AddTransaction from './components/pages/AddTransaction';
import AddCategory from './components/pages/AddCategory';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Navbar></Navbar>
        <div className="App">
          <Routes>
            <Route path='/' element ={ <Home /> } />
            <Route path='/dodajWydatek' element = { <AddTransaction /> } />
            <Route path='/dodajKategorie' element = { <AddCategory /> } />
            <Route path='/Logowanie' element = { <Login /> } />
            <Route path='/Rejestracja' element = { <Register /> } />
          </Routes>
        </div>      
    </>
    
  );
}

export default App;
