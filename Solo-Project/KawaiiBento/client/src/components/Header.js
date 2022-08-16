import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Header.css';
const Header = ({isLoggedIn, setLogIn}) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/current-user', {withCredentials:true})
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {console.log('ERROR!!!', err)})
    }, [isLoggedIn])

    const handleLogout = () => {
        axios.post('http://localhost:8000/logout', {}, {withCredentials:true})
        .then((res) => {
            setUser(null);
        })
        .catch((err)=> console.log(err))
    }
    return (
        <header className='header'>
            <h1>Kawaii Bento Meal's</h1>
            <NavLink className="nav-link" to="/">Home</NavLink>
        <div>
            {
                user ? <div>
                    <h3>Welcome! {user.firstName}</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>:<div>
                <NavLink className="nav-link" to="/login">Login</NavLink>
                <span> | </span>
                <NavLink className="nav-link" to="/register">Register</NavLink>
                </div>
            }
        </div>
        </header>
    )
}

export default Header