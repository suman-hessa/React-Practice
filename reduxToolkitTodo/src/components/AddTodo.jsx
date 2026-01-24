import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, updateTodo } from '../features/todo/todoSlice'
import { setIsEditable } from '../features/todo/editSlice'; 

function AddTodo() {

    const[input, setInput] = useState("");
    const dispatch = useDispatch()
    const isEditable = useSelector(state=>state.edit.isEditable)
    const currId = useSelector(state=>state.edit.id)
    console.log(isEditable)

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(input.length <=0){
            alert("input field cannot be empty!")
        }
        else if(input.length > 0 && isEditable){
            console.log("inside function : ", currId, isEditable);
            dispatch(updateTodo({id: currId, text: input}));
            setInput("")
            dispatch(setIsEditable({isEditable, id: 0}))
        }
        else if(input.length > 0 && !isEditable){
            dispatch(addTodo(input));
            setInput("");
        }
        
    }


  return (
    <>
        <h1 className='text-center text-2xl text-white mb-5 font-bold'>Todo using Redux Toolkit</h1>
        <form onSubmit={handleSubmit}
            className='w-full rounded-lg flex flex-col p-4'
            >
        <div className='flex gap-4 justify-center'>
            <input 
                type="text" 
                className="bg-white px-4 py-2 rounded-sm outline-none text-gray-700 w-7/12"
                placeholder={isEditable? "Update todo here...": "Add todo here"}
                value={input}
                onChange={(e)=>{setInput(e.target.value)}}
            />
            <button 
                className='bg-purple-500 px-4 py-2 rounded-sm text-white cursor-pointer hover:bg-purple-600 w-3/12'>
                {isEditable? "Save": "Add"}
            </button>  
        </div>
    </form>
    </>
    
  )
}

export default AddTodo
