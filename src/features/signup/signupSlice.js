import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../conf/conf";

const initialState = {
    status: 'idle',
    tokenState: {}
}

export const signupAsync = createAsyncThunk(
    'signup/fetchToken',
    async (formVal, options) => {
        try {
            const {name, email, password} = formVal;
            console.log("signupSlice.js signupAsync", name, email, password);

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("controller", "signup");

            const {data} = await axios.post(`${conf.serverBaseUrl}/index.php`, formData);
           
            console.log("signupSlice.js signupAsync", data);

            return data;
        } catch (error) { 
            console.log("signupSlice.js ", error?.response);
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
       setTokenState: (state)=>{
         state.tokenState = {}
       }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupAsync.pending, (state) => {
                state.status = 'loading';
        })
        .addCase(signupAsync.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.tokenState = action.payload;
                localStorage.setItem('token', JSON.stringify(action.payload));
        })
        .addCase(signupAsync.rejected, (state, action)=>{
            console.log("signupSlice.js sigunASync.rejcted action.payload", action.payload);
            state.status = action.payload;
        })
    }
})

export const {setTokenState} = signupSlice.actions

const signupReducer = signupSlice.reducer

export default signupReducer