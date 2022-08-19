import React,{ useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({setLogIn}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/login', user, {withCredentials:true})
        .then((res) =>{
            console.log(res.data);
            setLogIn(true);
            navigate('/');
        })
        // .catch((err) => console.log(err));
        .catch((err) => setErrors(err.response.data.errors));
    };
  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email: </label>
        <input 
            type='text'
            name='email'
            value={user.email}
            onChange={handleChange}
            
        />
        {errors.email && <span>{errors.email.message}</span>}
        <label htmlFor='password'>Password: </label>
        <input 
            type='text'
            name='password'
            value={user.password}
            onChange={handleChange}
            
        />
        {errors.password && <span>{errors.password.message}</span>}
        <button type='submit'>Login</button>
    </form>
  )
}

export default Login