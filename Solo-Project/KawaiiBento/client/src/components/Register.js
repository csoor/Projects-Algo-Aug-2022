import React,{ useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = ({setLogIn}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        axios.post('http://localhost:8000/register', user)
        .then((res) =>{
            console.log(res.data);
            setLogIn(true);
            navigate('/');
        })
        .catch((err) => setErrors(err.response.data.errors));
    };
  return (
    <form onSubmit={handleSubmit}>
        <div className="form-fields">
        <label htmlFor='firstName'>First Name: </label>
        <input 
            type='text'
            name='firstName'
            value={user.firstName}
            onChange={handleChange}
            
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        </div>
        <div className="form-fields">
        <label htmlFor='lastName'>Last Name: </label>
        <input 
            type='text'
            name='lastName'
            value={user.lastName}
            onChange={handleChange}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        </div>
        <div className="form-fields">
        <label htmlFor='email'>Email: </label>
        <input 
            type='text'
            name='email'
            value={user.email}
            onChange={handleChange}
        />
        {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="form-fields">
        <label htmlFor='password'>Password: </label>
        <input 
            type='text'
            name='password'
            value={user.password}
            onChange={handleChange}
        />
        {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="form-fields">
        <label htmlFor='confirmPassword'>Confirm Password: </label>
        <input 
            type='text'
            name='confirmPassword'
            value={user.confirmPassword}
            onChange={handleChange}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>
        <button type='submit'>Register</button>
    </form>
  )
}

export default Register