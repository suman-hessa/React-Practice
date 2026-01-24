import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {deleteTodo, toggleCompleted} from '../features/todo/todoSlice'
import {setIsEditable} from '../features/todo/editSlice'
import {Trash2, Pencil} from 'lucide-react'

function Todo() {
    const todos = useSelector(state=>state.todo.todos)
    const dispatch = useDispatch()
    const isEditable = useSelector(state=>state.edit.isEditable);
    const clid = useSelector(state=>state.edit.id);

    const editMode = (id)=>{
        dispatch(setIsEditable({isEditable, id}))
    }

  return (
    <div>
        <ul
         className='flex flex-col gap-3'>
            { todos.map((todo)=>(
                <li
                 className='bg-gray-300 px-4 py-2 flex justify-between items-center rounded-sm'
                key={todo.id}>
                <div className='flex gap-4 items-center'>
                    <input 
                    type="checkbox" 
                    checked={todo.completed}
                    onChange={()=>dispatch(toggleCompleted(todo.id))}
                    className='size-5 cursor-pointer'
                    disabled={isEditable}
                    />
                    <p className={`${todo.completed?'line-through': ''}`}>
                        {todo.text}
                    </p>    
                </div>
                <div className='flex gap-3 items-center'>
                    <button className='bg-gray-400 p-2 text-white rounded-sm cursor-pointer hover:bg-gray-500'
                    onClick={()=>editMode(todo.id)}
                    disabled={todo.completed}
                    >
                        <Pencil size={20}/>
                    </button>
                    <button
                    className='bg-red-600 hover:bg-red-700 text-white p-2 font-bold rounded-sm cursor-pointer flex justify-center items-center'
                    onClick={()=>(dispatch(deleteTodo(todo.id)))}><Trash2 size={20}/></button>
                </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Todo
