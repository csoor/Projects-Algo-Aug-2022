import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import BentoHome from './components/BentoHome';
import Bento from './components/Bento';
import NewBento from './components/NewBento';
import EditBento from './components/EditBento';
import Login from './components/Login';
import Register from './components/Register';
import { useState } from 'react';
function App() {
  const [isLoggedIn, setLogIn] = useState(false);
  return (
    <BrowserRouter>
    <div className="App">
      <Header  isLoggedIn={isLoggedIn} setLogIn={setLogIn}/>
      <Routes>
        <Route path="/" element={<BentoHome />}/>
        <Route path="/bento/:id" element={<Bento />}/>
        <Route path="/new" element={<NewBento />}/>
        <Route path="/edit/:id" element={<EditBento />}/>
        <Route path="/login" element={<Login setLogIn={setLogIn}/>}/>
        <Route path="/register" element={<Register setLogIn={setLogIn}/>}/>
      </Routes> 
    </div>
    </BrowserRouter>
  );
}

export default App;
