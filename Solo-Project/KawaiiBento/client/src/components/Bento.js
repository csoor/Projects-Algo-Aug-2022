import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Image from './Image.css';

const Bento = () => {
    const {id} = useParams();
    const [bento, setBento] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/bento/${id}`)
        .then((res) => {
            console.log(res.data);
            setBento(res.data);
        })
        .catch((err) => {
            console.log('ERROR!! by ID!', err);
        })
    }, [id]);

    return (
        <div>
            <h2>{bento.title}</h2>
            <div id='display-img'>
                <img src={bento.foodArt} />
            </div>

            <p>Difficulty Level: {bento.level}</p>
            <p>Cook Time: {bento.cookTime}</p>
            <p>Servings: {bento.servings}</p>
            <p>Description: {bento.description}</p>
            <p>Ingredients: {bento.ingredients}</p>
        </div>
    )
}

export default Bento