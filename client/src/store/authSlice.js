import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fullname : null,
    username : null,
    phoneoremail : null,
    password : null,
    isAuth : null,
    otp : {
      phoneoremail : "",
      hashotp : "",
    }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    setAuthCredentials: (state, action) => {
        state.fullname = action.payload.fullName;
        state.username = action.payload.userName;
        state.phoneoremail = action.payload.phoneOrEmail;
        state.password = action.payload.password;
    },
    setOtp : (state, action) => {
        state.otp.phoneoremail = action.payload.phoneOrEmail;
        state.otp.hashotp = action.payload.hashOtp;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setOtp, setAuthCredentials} = authSlice.actions

export default authSlice.reducer