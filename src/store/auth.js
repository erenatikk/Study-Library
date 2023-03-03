import { createSlice } from '@reduxjs/toolkit';


const initialAuthState = {
    email:""
  };

  const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
      setEmail(state, action)
       {
        state.email = action.payload;
      }
     
    },
  });

export const authActions = authSlice.actions;

export default authSlice.reducer;