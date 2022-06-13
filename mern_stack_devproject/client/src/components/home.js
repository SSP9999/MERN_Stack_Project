import React from 'react';
import "../styles/home.scss";
import { Link } from 'react-router-dom';

export default function home() {
    
  return (
    <div className='homepage'>

        <div className='header'>
            <h1>Developers Hub</h1>
            <div className='buttons'>
              <Link to ={'/signup'}><button className='signup' >Register</button></Link>
              <Link to ={'/signin'}><button className='signin'>Login</button></Link>
            
            </div>
        </div>
        
        <div className='maincontent'>
            <h1>Developers Hub</h1>
            <p>Create a Developer Profile/Portfolio,share posts and get help from other developers</p>
            <div  className='buttons'>
             <Link to ={'/signup'} ><button className='signup' >Sign Up</button></Link>
              <Link to ={'/signin'}><button className='signin'>Sign In</button></Link>
            
            </div>

        </div>



    </div>
  )
}
