import {nanoid, createSlice} from "@reduxjs/toolkit";

const initialState = {
    todos: [
        {
            id: 1,
            text: "Hello World",
            completed: false
        }
    ]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action)=>{
            const todo = {
                id: nanoid(),
                text: action.payload,
                completed: false
            }
            state.todos.push(todo);
        }, 
        updateTodo: (state, action)=>{
            state.todos = state.todos.map((todo)=> todo.id === action.payload.id? {...todo, text: action.payload.text}: todo)
        },
        deleteTodo: (state, action)=>{
            state.todos = state.todos.filter((todo)=> todo.id !== action.payload)
        },
        toggleCompleted: (state, action)=>{
            state.todos = state.todos.map((todo)=>todo.id === action.payload? {...todo, completed: !todo.completed}: todo)
        }
    }
})

export const {addTodo, deleteTodo, updateTodo, toggleCompleted} = todoSlice.actions;

export default todoSlice.reducer;