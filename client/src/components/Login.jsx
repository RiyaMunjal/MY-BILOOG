import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext.jsx';

const Login = () => {
  const Navigate=useNavigate();
  const [input, setInput] = useState({
    name: "",
    password: "",
  });
  const {login, logout, user}=useContext(AuthContext)

  const[error, setError]=useState('')

  const inputHandler = (e) => {
    setInput((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };
  

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(1);
    try {
      // const res = await axios.post(
      //   "http://localhost:5000/api/auth/login",
      //   input,
      //   {
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      //     withCredentials: true, 
      //   }
      // );
      // console.log(res.data);
      await login(input);
      Navigate('/');

    } catch (err) {
      console.log(2);
      console.log(err.response.data.Error);
      setError(err.response.data.Error);
    }
  };
  return (
    <div className='login'>
        <div className="container">
            <form >
                <h1>Login</h1>

                <div className='element'>     
                <label htmlFor="name">Name</label>
                <input type="text" placeholder='Enter You Name Ex: pikachu' name='name' onChange={inputHandler}/>
                </div>
               
                <div className='element'>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='Min 5 characters' minLength={5} name="password"onChange={inputHandler} />
                </div>

                <button type='submit' onClick={submitHandler}>Login</button>
                <p>{error}</p>
                <span>Don't you have an account? Click on <Link className='link' to="/register">Register</Link></span>
            </form>
        </div>

    
    </div>
  )
}

export default Login