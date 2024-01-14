import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    value: true
}

export const toggleSlice = createSlice({
    name:'toggle',
    initialState,
    reducers:{
        toggleEmployeeInfo:(state)=>{
            state.value= !state.value
        }
    }

})

export const {toggleEmployeeInfo} = toggleSlice.actions
export default toggleSlice.reducer;