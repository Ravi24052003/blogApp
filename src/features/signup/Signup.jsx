import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setTokenState, signupAsync } from './signupSlice';
import { Link, useNavigate } from 'react-router-dom';
import MainHeader from '../../components/header/MainHeader';

const Signup = () => {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isPasswordConfirm, setIsPasswordConfirm] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [nameReqErr, setNameReqErr] = useState("");
    const [emailReqErr, setEmailReqErr] = useState("");
    const [passwordReqErr, setPasswordReqErr] = useState("");

    const status = useSelector(state=> state.signup.status);
    const tokenState = useSelector(state=> state.signup.tokenState);
    const tokenObj = JSON.parse(localStorage.getItem("token"));

  

    useEffect(()=>{
    if(tokenState?.token){
      dispatch(setTokenState())
      
      navigate("/dashboard");
    }
    }, [tokenState])

  return (
    <div>
      {tokenObj?.token && <MainHeader />}
      <h1 className=' text-center font-bold text-2xl mb-5'>Signup</h1>
      <form onSubmit={handleSubmit((formVal)=>{
       const {password, confirmPassword, name, email} = formVal;

       if(password === confirmPassword){
        setNameReqErr("");
        setEmailReqErr("");
        setPasswordReqErr("");
        
        if(!name.trim() || !email.trim() || !password.trim()){
         
          if(!name.trim()){
            setNameReqErr("Name field is required");
          }

          if(!email.trim()){
            setEmailReqErr("Email field is required");
          }

          if(!password.trim()){
            setPasswordReqErr("Password field is required");
          }

          return;
        }

        setIsPasswordConfirm(true);
        dispatch(signupAsync(formVal))
       }
        else{
         setIsPasswordConfirm(false);
        }
      })}>

      <div className=' flex flex-col items-center border-gray-500 border bg-gray-100 w-[95%] mx-auto rounded md:w-[500px]'>


      <div className=' flex flex-col items-start mb-4'>
        <label htmlFor="firstName">Name</label>
      <input 
      id='name'
      className='border border-black w-[220px] rounded focus:bg-indigo-100 md:w-[300px]'
      type="text"
      {...register("name")}
      />
      {/* <p className=' text-red-500 w-[220px] md:w-[300px]'>{}</p> */}
      <p className=' text-red-500 w-[220px] md:w-[300px]'>{nameReqErr}</p>
      </div>
     
      
      <div className=' flex flex-col items-start mb-4'>
        <label htmlFor="email">Email</label>
      <input type="text" 
      id='email'
      className='border border-black w-[220px] rounded focus:bg-indigo-100 md:w-[300px]'
      {...register("email")}
      />
       <p className=' text-red-500 w-[220px] md:w-[300px]'>{status?.emailErr}</p>
       <p className=' text-red-500 w-[220px] md:w-[300px]'>{emailReqErr}</p>
      </div>

   
      
     

{isPasswordVisible? 

<div className=' flex flex-col items-start mb-4'>
  <label htmlFor="password">Password</label>
  <div>
  <input
      type="text" 
      id='password'
      className='border border-black w-[200px] rounded focus:bg-indigo-100 md:w-[280px]'
      {...register("password")}
      /> 

      <button type='button' onClick={()=>{
        setIsPasswordVisible(!isPasswordVisible)
       }}>{isPasswordVisible? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}</button>
  </div>
  <p className=' text-red-500 w-[220px] md:w-[300px]'>{passwordReqErr}</p>
</div>
    
      
      :

      <div className=' flex flex-col items-start mb-4'>
      <label htmlFor="password">Password</label>
      <div>
      <input
          type="password" 
          id='password'
          className='border border-black w-[200px] rounded focus:bg-indigo-100 md:w-[280px]'
          {...register("password")}
          /> 
    
          <button type='button' onClick={()=>{
            setIsPasswordVisible(!isPasswordVisible)
           }}>{isPasswordVisible? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}</button>
      </div>
      <p className=' text-red-500 w-[220px] md:w-[300px]'>{passwordReqErr}</p>
    </div>
     
    }

     

<div className=' flex flex-col items-start'>

  <label htmlFor="confirmPassword">Confirm Password</label>
  <input 
      type="password"
      id='confirmPassword'
      className='border border-black w-[220px] rounded focus:bg-indigo-100 md:w-[300px]'
      {...register("confirmPassword")}
      />
      <p className=' text-red-500 w-[220px] md:w-[300px]'>{isPasswordConfirm || "Password and Confirm Password doesn't match"}</p>
</div>
 

      <button className=' bg-green-500 text-white font-semibold px-4 py-1 rounded my-4'>Signup</button>

      </div>
      </form>

{
  !tokenObj?.token &&  <p className=' text-center mt-4'>Already have an account ?  
  <Link to="/" className=' text-violet-500 font-semibold'>Login</Link>
   </p>
}
     
    </div>
  )
}

export default Signup
