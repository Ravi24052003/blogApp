import React, { useEffect } from 'react'
import { deleteAsync, readOwnAsync, setEditablePost } from './posts'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/header/MainHeader';
import authCheck from './authCheck';

function Dashboard() {
    const userPosts = useSelector(state=>state.posts.userPosts);
    const status = useSelector(state=> state.posts.status);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(readOwnAsync());
    }, [])

    console.log("Dashbord.jsx UserPosts", userPosts);


    const handlePostEdit = function(elem){
    dispatch(setEditablePost(elem));
    navigate("/edit-post");
    }

    const handlePostDelete = function(elem){
     dispatch(deleteAsync(elem));
    }

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
    <div>
      <MainHeader />
      <h1 className='text-center font-semibold text-2xl'>Dashboard</h1>

      {
      (status != "loading" && userPosts?.length == 0)? <h2 className=' text-center font-semibold my-5'>You haven't created any posts yet please click on green button to create a post</h2> : <h2 className=' text-center font-semibold my-5'>Posts</h2>
      }

      

    <div className='w-[90%] mx-auto flex justify-end my-5'>
      <button onClick={()=>{
        navigate("/create-post");
      }} className=' px-2 py-1 text-white bg-green-500 rounded'>Create Post</button>
    </div>

      <div>
       {
        userPosts.length > 0 && 
         

          <table className=' mx-auto border-collapse border-[1.6px] border-slate-500' >
            <thead>
              <tr>
                <th className=' border-[1.4px] border-slate-400 px-4 py-1'>Id</th>
                <th className=' border-[1.4px] border-slate-400 px-4 py-1'>Title</th>
                <th className=' border-[1.4px] border-slate-400 px-4 py-1'>Description</th>
                <th className=' border-[1.4px] border-slate-400 px-4 py-1'>Operations</th>
              </tr>
            </thead>

            <tbody>
              {
                userPosts?.map((elem)=>(
                <tr key={elem?.id} >
                  <td className=' border-[1.4px] border-slate-400 px-4 py-1'>{elem?.id}</td>
                  <td className=' border-[1.4px] border-slate-400 px-4 py-1'>{elem?.title}</td>
                  <td className=' border-[1.4px] border-slate-400 px-4 py-1'>{elem?.description}</td>
                  <td className=' border-[1.4px] border-slate-400 px-4 py-1'>
                    <button onClick={()=>handlePostEdit(elem)} className=' bg-yellow-500  rounded text-white px-2 py-1 mr-2'>Edit</button>
                    <button onClick={()=>handlePostDelete(elem)} className=' bg-red-500 rounded px-2 text-white py-1'>Delete</button>
                  </td>
                </tr>
                ))
              }
            </tbody>
          </table>
       
       }
      </div>
    </div>
    </>
  )
}

export default Dashboard
