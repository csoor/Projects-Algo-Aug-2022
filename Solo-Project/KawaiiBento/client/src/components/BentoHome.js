import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Image from './Image.css';

const BentoHome = () => {
  const [bento, setBento] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:8000/api/bento')
    .then((res) => {
      console.log(res.data);
      setBento(res.data);
      setUser(res.data);
    })
    .catch((err) => console.log('Error!!!',err));
  }, []);

  const deleteBento = (bentoId) => {
    axios.delete(`http://localhost:8000/api/bento/${bentoId}`)
    .then((res) => {
      const newBento = bento.filter((kawaii) => kawaii._id !== bentoId);
      setBento(newBento);
    })
    .catch((err) => console.log('Error!!!',err));
  };
  const newBento = () => {
    axios.get('http://localhost:8000/api/bento')
    .then((res) => {
      navigate('/new');
    })
    .catch((err) => console.log('Error!!!',err));
  };
/*
  const editBento = () => {
    axios.get(`http://localhost:8000/api/bento/`)
    .then((res) => {
      navigate(`/edit/${bento._id}`);
    })
    .catch((err) => console.log('Error!!!',err));
  }; */
  return (
    <div className='container'>
      <nav className='header'>
      <Link className="nav-link" to="/login">Login</Link>
      <span> | </span>
      <Link className="nav-link" to="/register">Register</Link>
      </nav>
      <h2>Welcome </h2>
      {bento.map((kawaii) => (
          <div key={kawaii._id}>
            <Link to={`/bento/${kawaii._id}`}>{kawaii.title}</Link>
            <br />
            <div id='display-img'>
              <img src={kawaii.foodArt} />
            </div>
            <p>{kawaii.level}</p>
            <p>{kawaii.description}</p>
            
            <Link to={`/edit/${kawaii._id}`}>Edit</Link>
            <span> | </span>
            <button onClick={() => deleteBento(kawaii._id)}>Delete</button>
          </div>
        ))}
        <button onClick={newBento}>Add</button>
    </div>
  );
};

export default BentoHome;