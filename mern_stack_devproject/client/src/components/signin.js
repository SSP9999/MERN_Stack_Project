import React,{useEffect, useState} from 'react';
import '../styles/signin.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import { Redirect } from "react-router-dom";

import jwt from 'jsonwebtoken';

export default function Signin() {


  const [data,setData]=useState({
    email:'',
    password:'',
  })
  const changeHandler = e =>{
    e.preventDefault();
    setData({...data,[e.target.name]:e.target.value})
  }
  const navigate=useNavigate();
  const submitHandler=e=>{
    e.preventDefault();
   axios.post('http://localhost:4000/login',data).then(
     res=>{
       localStorage.setItem('token',res.data.token)
       navigate('/dashboard');
      }
   )
   
  }
  useEffect(()=> {
    const token = localStorage.getItem('token');
    try {
      jwt.verify(token,'jwtpassword')
      if(token){
        return navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }

  },[])




  return (
    <div className='signin-container'>
         <div className='header'>
            <Link to={'/home'}> <h1>Developers Hub</h1> </Link>
            <div className='buttons'>
            <Link to ={'/signup'} ><button className='signup' >Register</button></Link>
             <Link to ={'/signin'}><button className='signin'>Login</button></Link>
             </div>

        </div>

        <div className='signin-data'>
            <div className='signin-heading'>Sign in</div>
            <div className='signin-account'>Sign Into Your Account</div>

            <form className='form' onSubmit={(e)=>submitHandler(e)} autoComplete="off"> 
            <input className='login-email' name='email' type='text' onChange={(e) => changeHandler(e)} placeholder='Email Address'/><br/>
            <input className='login-password' name='password' type='password' onChange={(e) => changeHandler(e)}placeholder='Password' /><br/>
            <input className='login' type='submit' placeholder='Login'/>

            </form>
           
        </div>

    </div>
  )
}
