import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../conf/conf";

const initialState = {
    status: 'idle',
    tokenState: {},
    isJWTexpired: false,
    isJWTmalformed: false
}

const signupFulfilled = createAction("signup/fetchToken/fulfilled");


export const loginAsync = createAsyncThunk(
    'login/fetchToken',
    async (formVal, options) => {
        try {
            const { email, password} = formVal;
            console.log("loginSlice.js signupAsync", email, password);

            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("controller", "login");

            const {data} = await axios.post(`${conf.serverBaseUrl}/index.php`, formData);
           
            console.log("loginSlice.js loginAsync", data);

            return data;
        } catch (error) { 
            console.log("loginSlice.js loginAsync error", error);
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
       setTokenState: (state)=>{
        state.tokenState = {}
       }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
        })
        .addCase(loginAsync.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.tokenState = action.payload;
                state.isJWTexpired = false;
               localStorage.setItem('token', JSON.stringify(action.payload));
               state.isJWTmalformed = false;
        })
        .addCase(loginAsync.rejected, (state, action)=>{
            console.log("loginSlcie.js loginAsync.rejected action.payload", action.payload);
            state.status = action.payload;
        })
        
        .addCase(signupFulfilled, (state, action)=>{
            state.isJWTexpired = false
            state.isJWTmalformed = false
        })
    }
})

export const {setTokenState} = loginSlice.actions 

const loginReducer = loginSlice.reducer

export default loginReducer