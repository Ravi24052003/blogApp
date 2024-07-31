import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createAsync, editAsync, setPostCreated, setPostEdited } from './posts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function EditPost() {
    const editablePost = useSelector(state=> state.posts.editablePost);
    const {register, handleSubmit} = useForm({
        defaultValues: {
            title: editablePost?.title || "",
            description: editablePost?.description || ""
        }
    });

    const postEdited = useSelector(state=> state.posts.postEdited);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [titleReqErr, setTitleReqErr] = useState("");
    const [descriptionReqErr, setDescriptionErr] = useState("");

    useEffect(()=>{
    if(postEdited){
        navigate("/dashboard");
        
        dispatch(setPostEdited());
    }
    else if(!editablePost?.id){
     navigate("/dashboard");
    }
    else{

    }
    }, [postEdited, editablePost])

  return (
    <>
    <h1 className=' text-center text-2xl font-semibold'>Edit Post</h1>
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
       
        dispatch(editAsync({...formVal, id: editablePost?.id}));
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
      

      <button className=' bg-green-500 px-4 py-1 rounded text-white font-semibold my-5'>Update</button>

      </div>
      </form>
    </>
  )
}

export default EditPost
