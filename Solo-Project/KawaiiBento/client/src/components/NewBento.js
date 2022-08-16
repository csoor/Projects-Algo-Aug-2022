import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import Image from './Image.css';

const NewBento = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [foodArt, setFoodArt] = useState("");
  const [ingredients, setIngredients] = useState("N/A");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/bento', {
      title,
      description,
      level,
      foodArt,
      ingredients,
      cookTime,
      servings
    }, {withCredentials:true})
    .then((res) => {
      console.log(res.data);
      navigate('/');
    })
    .catch((err) => {console.log('POST ERROR!!', err)})
  }

  function handleImg(e) {
    console.log(e.target.files);
    setFoodArt(URL.createObjectURL(e.target.files[0]))
  }
  return (
    <div>
      <header>Add New Kawaii Bento</header>

      <form onSubmit={handleSubmit}>
        <div className="form-fields" id="display-img">
          <label>Food Art: </label>
          <input 
              onChange={handleImg}
              type="file" 
              name="foodArt" 
              required
            />
            
        </div>
        <div className="form-fields">
          <label>Title: </label>
          <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              name="title"
              type="text"
              required
            />
          </div>
          <div className="form-fields">
            <label>Difficulty Level: </label>
            <select value={level} name='level' onChange={(e) => setLevel(e.target.value)} required>
              <option value='Easy'>Easy</option>
              <option value='Medium'>Medium</option>
              <option value='Hard'>Hard</option>
              <option value='Nightmare'>Nightmare</option>
            </select>
          </div>
          <div className="form-fields">
            <label>Cook Time: </label>
            <input
              onChange={(e) => setCookTime(e.target.value)}
              value={cookTime}
              name="cookTime"
              type="text"
              required
            />
          </div>
          <div className="form-fields">
            <label>Servings: </label>
            <input
              onChange={(e) => setServings(e.target.value)}
              value={servings}
              name="servings"
              type="number"
              required
            />
          </div>
          <div className="form-fields">
            <label>Description: </label>
            <textarea 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            name="description"
            type="text"
            rows="5" cols="30"
            required
            />
          </div>
          <div className="form-fields">
            <label>Ingredients: </label>
            <textarea 
            onChange={(e) => setIngredients(e.target.value)}
            value={ingredients}
            name="ingredients"
            type="text"
            rows="5" cols="30"
            />
          </div>
          <button type="submit">Add New Bento</button>
      </form>
    </div>
  )
}

export default NewBento