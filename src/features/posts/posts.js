import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../conf/conf";

const initialState = {
    status: 'idle',
    allPosts: [],
    userPosts: [],
    postCreated: false,
    postEdited: false,
    editablePost: {}
}

export const readAllAsync = createAsyncThunk(
    'posts/fetchAllPosts',
    async (_="nothing", options) => {
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));
            const {data} = await axios.get(`${conf.serverBaseUrl}/index.php?controller=readAll`,{
                headers: {
                    Authorization: tokenObj?.token
                }
            });
           
            console.log("dashBoard.js readAllAsync", data);

            return data;
        } catch (error) { 
            console.log("dashBoard.js ", error?.response);
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)


export const readOwnAsync = createAsyncThunk(
    'posts/fetchUserPosts',
    async (_="nothing", options) => {
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));
            const {data} = await axios.get(`${conf.serverBaseUrl}/index.php?controller=readOwn`,{
                headers: {
                    Authorization: tokenObj?.token
                }
            });
           
            console.log("dashBoard.js readOwnAsync", data);

            return data;
        } catch (error) { 
            console.log("dashBoard.js ", error?.response);
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)


export const createAsync = createAsyncThunk(
    'posts/createPosts',
    async (formVal, options) => {
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));
            const {title, description} = formVal;

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("controller", "create");

            const {data} = await axios.post(`${conf.serverBaseUrl}/index.php`, formData, {
                headers: {
                    Authorization: tokenObj?.token
                }
            });
           
            console.log("posts.js createAsync data", data);

            return data;
        } catch (error) { 
            console.log("dashBoard.js ", error?.response);
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)


export const editAsync = createAsyncThunk(
    'posts/editPosts',
    async (formVal, options) => {
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));
            const {title, description, id} = formVal;

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("id", id);
            formData.append("controller", "update");

            const {data} = await axios.post(`${conf.serverBaseUrl}/index.php`, formData, {
                headers: {
                    Authorization: tokenObj?.token
                }
            });
           
            console.log("posts.js editAsync data", data);

            return data;
        } catch (error) { 
            console.log("dashBoard.js ", error?.response);
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)


export const deleteAsync = createAsyncThunk(
    'posts/deletePosts',
    async (formVal, options) => {
        try {
            const tokenObj =  JSON.parse(localStorage.getItem('token'));
            const {id} = formVal;

            const formData = new FormData();
            formData.append("id", id);
            formData.append("controller", "delete");

            const {data} = await axios.post(`${conf.serverBaseUrl}/index.php`, formData, {
                headers: {
                    Authorization: tokenObj?.token
                }
            });
           
            console.log("posts.js deleteAsync data", data);

            return id;
        } catch (error) { 
            console.log("dashBoard.js ", error?.response);
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      setPostCreated: function(state){
      state.postCreated = false;
      },
      setPostEdited: function(state){
      state.postEdited = false;
      },
      setEditablePost: function(state, action){
        console.log("posts.js setEditable action.payload", action.payload);
        state.editablePost = action.payload
      }
    },
    extraReducers: (builder) => {
        builder
        .addCase(readAllAsync.pending, (state) => {
        state.status = 'loading';
        })
        .addCase(readAllAsync.fulfilled, (state, action)=>{
        state.status = 'idle';
        state.allPosts = action.payload;
        })
        .addCase(readAllAsync.rejected, (state, action)=>{
        console.log("signupSlice.js sigunASync.rejcted action.payload", action.payload);
        state.status = action.payload;
        })

            .addCase(readOwnAsync.pending, (state) => {
            state.status = 'loading';
            })
            .addCase(readOwnAsync.fulfilled, (state, action)=>{
            state.status = 'idle';
            state.userPosts = action.payload;
            })
            .addCase(readOwnAsync.rejected, (state, action)=>{
            console.log("signupSlice.js sigunASync.rejcted action.payload", action.payload);
            state.status = action.payload;
            })

        .addCase(createAsync.pending, (state) => {
        state.status = 'loading';
        })
        .addCase(createAsync.fulfilled, (state, action)=>{
        state.status = 'idle';
        console.log("posts.js createAsync action.payload", action.payload);
        state.userPosts = action.payload;
        state.postCreated = true;
        })
        .addCase(createAsync.rejected, (state, action)=>{
        console.log("signupSlice.js sigunASync.rejcted action.payload", action.payload);
        state.status = action.payload;
        })


    .addCase(editAsync.pending, (state) => {
        state.status = 'loading';
        })
        .addCase(editAsync.fulfilled, (state, action)=>{
        state.status = 'idle';
        console.log("posts.js editAsync action.payload", action.payload);
        state.userPosts = action.payload;
        state.postEdited = true;
        state.editablePost = {};
        })
        .addCase(editAsync.rejected, (state, action)=>{
        console.log("signupSlice.js sigunASync.rejcted action.payload", action.payload);
        state.status = action.payload;
        })
    

        .addCase(deleteAsync.pending, (state) => {
            state.status = 'loading';
            })
            .addCase(deleteAsync.fulfilled, (state, action)=>{
            state.status = 'idle';
            console.log("posts.js editAsync action.payload", action.payload);
            let newUserPosts = [...state.userPosts];
            let index = newUserPosts.findIndex((elem)=>elem.id == action.payload);

            newUserPosts.splice(index, 1);
            state.userPosts = newUserPosts;
            })
            .addCase(deleteAsync.rejected, (state, action)=>{
            console.log("signupSlice.js sigunASync.rejcted action.payload", action.payload);
            state.status = action.payload;
            })
    }
})

export const {setPostCreated, setPostEdited, setEditablePost} = postsSlice.actions

const postReducer = postsSlice.reducer

export default postReducer