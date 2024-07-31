import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login/loginSlice'
import signupReducer from '../features/signup/signupSlice'
import postReducer from '../features/posts/posts'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    posts: postReducer
  },
})