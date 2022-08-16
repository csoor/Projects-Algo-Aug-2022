import React,{ useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({setLogIn}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/login`, user, {withCredentials:true})
        .then((res) =>{
            console.log(res.data);
            setLogIn(true);
            navigate('/');
        })
        .catch((err) => console.log(err));
    };
  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email: </label>
        <input 
            type='text'
            name='email'
            value={user.email}
            onChange={handleChange}
            required
        />
        <label htmlFor='password'>Password: </label>
        <input 
            type='text'
            name='password'
            value={user.password}
            onChange={handleChange}
            required
        />
        <button type='submit'>Login</button>
    </form>
  )
}

export default Login