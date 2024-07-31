import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from "./app/store.js"
import { Provider } from 'react-redux'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
import Login from "./features/login/Login.jsx"
import Signup from "./features/signup/Signup.jsx"
import ErrorPage from "./ErrorPage.jsx"
import Dashboard from './features/posts/Dashboard.jsx'
import CreatePost from './features/posts/CreatePost.jsx'
import EditPost from './features/posts/EditPost.jsx'
import AllPosts from './features/posts/AllPosts.jsx'


const router = createBrowserRouter(
  createRoutesFromChildren(
   <Route path='/' element={<App />} errorElement={<ErrorPage />}>
   <Route path='' element={<Login />}/>
   <Route path='signup' element={<Signup />} />
   <Route path='dashboard' element={<Dashboard />}/>
   <Route path='create-post' element={<CreatePost />} />
   <Route path='edit-post' element={<EditPost />} />
   <Route path='all-posts' element={<AllPosts />} />
   </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
