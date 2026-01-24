import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEditable: false,
    id: 1,
}

const editSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        setIsEditable: (state, action)=>{
            state.isEditable = !action.payload.isEditable;
            state.id = action.payload.id;
        }
    }
})

export const {setIsEditable} = editSlice.actions;
export default editSlice.reducer;