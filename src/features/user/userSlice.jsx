import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Rudransh Khandelwal',
  role: 'manager'
};

export const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {
    toggleUser:(state)=>{
      if(state.role==='manager'){
        state.role='employee'
      }else{
        state.role='manager'
      }
    }
  }
});
export const {toggleUser} = userSlice.actions
export default userSlice.reducer;
