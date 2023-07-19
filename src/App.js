import './App.css';
import Navbar from './components/Navbar';
import AddExpense from './components/pages/AddExpense';
import AddCategory from './components/pages/AddCategory';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthProvider';

function App() {

  return (
    <>
    <AuthProvider>
      <Navbar></Navbar>
        <div className="App">
          <Routes>
            <Route path='/' element ={ <Home /> } />
            <Route path='/dodajWydatek' element = { <AddExpense /> } />
            <Route path='/dodajKategorie' element = { <AddCategory /> } />
            <Route path='/Logowanie' element = { <Login /> } />
            <Route path='/Rejestracja' element = { <Register /> } />
          </Routes>
        </div>
    </AuthProvider>
      
    </>
    
  );
}

export default App;
