import Axios  from 'axios';
import React,{useState,useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.scss'

const Register = () =>{

  
  const {data,setData}=useState({
    fullname:'',
    email:'',
    mobile:'',
    skill:'',
    password:'',
    confirmpassword:''
  })
  const changeHandler =e=>{
    e.preventDefault();
    setData({...data,[e.target.name]:e.target.value})
  }
  const submitHandler=e=>{
    e.preventDefault();
    console.log(data)

  }
  const fromRef = useRef();
  const navigate = useNavigate();

/*validation for signup inputs*/

var validate="^[a-zA-Z'.\s]{2,40}$" ;
var validateMail= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var validationPswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
var validateNumber= /[0-9]/;

function validation(){
     var x=fromRef.current.fullname.value
    if(x.match(validate)){
      fromRef.current.fullname.style.borderColor='green';
    }
    else{
      fromRef.current.fullname.style.borderColor='red';
    }
}

function validationEmail()
{
   var y= fromRef.current.email.value;
    if( y.match(validateMail))
    {
        fromRef.current.email.style.borderColor='green'
    }
    else
    {
        fromRef.current.email.style.borderColor='red'
    }
}
// /*validation for password*/

function validationPswdCheck()
{
   var z=fromRef.current.password.value;
    if( z.match(validationPswd))
    {
        fromRef.current.password.style.borderColor='green'
    }
    else
    {
        fromRef.current.password.style.borderColor='red'
    }
}

// /*validation for phone number*/


function validateNum()
{
     var a=fromRef.current.mobile.value;
     var validateNumber= /[0-9]/;
    if( a.match(validateNumber))
    {
        fromRef.current.mobile.style.borderColor='green'
    }
    else
    {
      fromRef.current.mobile.style.borderColor='red'
    }
}


function validationSubmit()
{
if((fromRef.current.mobile.match(validateNumber))&&(fromRef.current.password.value.match(validationPswd))&& ( fromRef.current.email.value.match(validateMail))&&(fromRef.current.fullname.value.match(validate)))
    {
        alert("authenticated Succesfully");
    }
    else{
        alert("Enter Details Correctly");
    }

}


  const submitHandle = async e => {

    e.preventDefault();
    const tempData = {
      fullname: fromRef.current.fullname.value,
      email: fromRef.current.email.value,
      mobile: fromRef.current.phone.value,
      skill: fromRef.current.skills.value,
      password: fromRef.current.password.value,
      confirmpassword: fromRef.current.confirmpassword.value,
    };
    const registerData = await Axios.post("http://localhost:4000/register",{
       ...tempData
    })
    alert('data updated succesfull')
   if(registerData.data == 'User registered') {
    navigate("/signin", { replace: true })
   }
   validationSubmit()
  }

 
  return (
    <div className='signUp-container'>

         <div className='header'>
           <Link to={'/home'}><h1>Developers Hub</h1></Link> 
            <div className='buttons'>
             <Link to ={'/signup'}><button className='signup' >Register</button></Link>
             <Link to ={'/signin'}><button className='signin'>Login</button></Link>
            </div>
        </div>

        <div className='signup-data'>
            <div className='signup-heading'>Sign up</div>
            <div className='create-user'>Create Your Account</div>
          <form className='from' ref={fromRef} onSubmit={submitHandler} >
            <input className='name-input' type='text' onKeyDown={validation} placeholder='Name' onChange={changeHandler} name='fullname'/><br/>
            <input className='email-input'  type='email' onKeyDown={validationEmail} placeholder='E-Mail' onChange={changeHandler}  name='email'/><br/>
            <input className='mobile-input' type='number' onKeyDown={validateNum} placeholder='Mobile Number' onChange={changeHandler}  name='phone' /><br/>
            <input className='skill-input' type='text' placeholder='Skills' onChange={changeHandler}  name='skills' /><br/>
            <input className='password-input' type='password' onChange={changeHandler}  onKeyDown={validationPswdCheck} placeholder='Password' name='password'/><br/>
            <input className='confirm-input' type='password'  onChange={changeHandler} onKeyDown={validationPswdCheck} placeholder='Confirm Password' name='confirmpassword' /><br/>


            <button className='submit' onClick={(e) =>(submitHandle(e))} >Sign Up</button>
            <Link to={'/signin'}>Alreay have an account.</Link>
            </form>

        </div>

    </div>
  )
}
export default Register;