import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken'
import '../styles/dashboard.scss'
import axios from 'axios'




const Dashboard = () => {

  const [Post ,setPost] = useState([ ]);
  
  axios.get("http://localhost:4000/allprofiles")
  .then(res => setPost(res.data))
  
  
  
  const navigate = useNavigate();
  useEffect (() => {
    const token = localStorage.getItem('token');
    if(!token) {
      
      try {
        jwt.verify(token,'jwtpassword')
        if(token){
          return navigate('/dashboard')
        }
      } catch (error) {
        console.log(error)
      }
      navigate('/signin')
    }
    if(token) {
      
      try {
        jwt.verify(token,'jwtpassword')
        if(token){
          return navigate('/dashboard')
        }
      } catch (error) {
        console.log(error)
      }
      navigate('/signin')
    }
  },[])
  
  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/signin')
    
  }
  
  
  

  return (
    <div>
        <button className='button' onClick={logoutHandler}>logout</button>

        {Post.length && Post.map( p => <ul>
          <li key={p.id}>{ p.fullname} <br/> { p.skill}</li>
          <li>Review</li>
        </ul>)}
    </div>
  )
}

export default Dashboard