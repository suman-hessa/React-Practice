import {configureStore} from '@reduxjs/toolkit'
import todoReducer from "../features/todo/todoSlice.js"
import editReducer from "../features/todo/editSlice.js"

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        edit: editReducer
    },
    devTools: true,
})