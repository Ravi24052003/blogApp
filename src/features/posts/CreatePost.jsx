import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createAsync, setPostCreated } from './posts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/header/MainHeader';
import authCheck from './authCheck';


function CreatePost() {
    const {register, handleSubmit} = useForm();

    const postCreated = useSelector(state=> state.posts.postCreated);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [titleReqErr, setTitleReqErr] = useState("");
    const [descriptionReqErr, setDescriptionErr] = useState("");

    useEffect(()=>{
    if(postCreated){
        navigate("/dashboard");
        
        dispatch(setPostCreated());
    }
    }, [postCreated])


    useEffect(()=>{
      authCheck()
      .then((data)=>{
      console.log("AllPosts.jsx" ,data);
      })
      .catch((error)=>{
        console.log("error", error)
        localStorage.removeItem("token");
        navigate("/");
      })
      }, [])

  return (
    <>
    <MainHeader />
    <h1 className=' text-center text-2xl font-semibold'>Create Post</h1>
     <form onSubmit={handleSubmit((formVal)=>{
        const {title, description} = formVal;

        setTitleReqErr("");
        setDescriptionErr("");
        
        if(!title.trim() || !description.trim()){

          if(!title.trim()){
            setTitleReqErr("Title is required");
          }

          if(!description.trim()){
            setDescriptionErr("Description is required");
          }

          return;
        }
       
        dispatch(createAsync(formVal));
      })}>

        <div className=' flex flex-col items-center w-[95%] mx-auto rounded border-2 my-4 md:w-[500px] '>
   
   <div className=' my-5 flex flex-col items-center md:my-6'>
    <div className=' flex justify-center'>
    <div className=' flex flex-col items-start'>

<label htmlFor="title">Title</label>
<input 
className=' border border-black w-[220px] rounded focus:bg-indigo-100 md:w-[300px] '
type="text"
id='title'
{...register("title")}
/>

</div>
    </div>
    <p className=' text-red-500 w-[220px] md:w-[300px]'>{titleReqErr}</p>
   </div>
     
    
   <div className=' my-5 flex flex-col items-center md:my-6'>
    <div className=' flex justify-center'>
    <div className=' flex flex-col items-start'>

<label htmlFor="description">Description</label>

<textarea
rows="5"
className=' border border-black w-[220px] rounded focus:bg-indigo-100 md:w-[300px] '
id='description'
  {...register("description")}
/>

</div>
    </div>
    <p className=' text-red-500 w-[220px] md:w-[300px]'>{descriptionReqErr}</p>
   </div>
      

      <button className=' bg-green-500 px-4 py-1 rounded text-white font-semibold my-5'>Create</button>

      </div>
      </form>
    </>
  )
}

export default CreatePost
