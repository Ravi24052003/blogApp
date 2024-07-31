import React, { useEffect } from 'react'
import { readAllAsync } from './posts'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/header/MainHeader';
import authCheck from './authCheck';

function AllPosts() {
    const allPosts = useSelector(state=> state.posts.allPosts);
    const userPosts = useSelector(state=> state.posts.userPosts);
    const dispatch = useDispatch();

    const navigate = useNavigate();

useEffect(()=>{
        dispatch(readAllAsync());
}, [userPosts])

useEffect(()=>{
authCheck()
.then((data)=>{
console.log("AllPosts.jsx" ,data);
})
.catch((error)=>{
  localStorage.removeItem("token");
  navigate("/");
})
}, [])

console.log("all posts .jsx ", allPosts);
  return (
    <div>
      <MainHeader />
      <h1 className=' text-center font-semibold text-2xl'>All posts</h1>

      {
        allPosts.length > 0 && allPosts.map((elem)=>(
            <div key={elem.id} className=' border-slate-500 mb-5 w-[90%] mx-auto border-[2px] px-2 py-2'>
                <div className=' flex flex-col items-start'>
                    <h1>Title</h1>
                <h1>{elem?.title}</h1>
                </div>
             
             <div className=' flex flex-col items-start mt-5 mb-2'>
                <h1>Description</h1>
                <p>{elem?.description}</p>
             </div>
             

             <div className=' flex justify-end w-[80%] mx-auto'>
                <div className=' inline-block border-purple-400 border-[1.5px] px-1 py-1'>
                <p>Author: {elem?.user_name}</p>
                <p>Author email: {elem?.user_email}</p>
                </div>
           
             </div>
            </div>
        ))
      }
    </div>
  )
}

export default AllPosts
