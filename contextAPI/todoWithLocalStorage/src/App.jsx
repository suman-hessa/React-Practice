import { useEffect, useState } from "react"
import { TodoContextProvider } from "./contexts"
import {TodoForm, TodoItem} from "./components"

function App() {
  const[todos, setTodos] = useState([])

  const addTodo = (todo)=>{
    console.log(todos);
    setTodos((prevTodos)=>[...prevTodos, {...todo}])
  }

  const updateTodo = (id, todo)=>{
    setTodos((prevTodos)=>prevTodos.map((currTodo)=> currTodo.id === id? {...currTodo, todo}: currTodo))
  }

  const deleteTodo = (id)=>{
    setTodos((prevTodos)=>prevTodos.filter((currTodo)=> currTodo.id!== id))
  }

  const toggleCompleted = (id)=>{
    console.log(id);
    setTodos((prevTodos)=> prevTodos.map((currTodo)=> currTodo.id === id? {...currTodo, completed: !currTodo.completed }: currTodo))
  }

  useEffect(()=>{
    const localTodos = JSON.parse(localStorage.getItem("todos"))

    if(localTodos && localTodos.length > 0){
      setTodos(localTodos)
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

    return (
      <TodoContextProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleCompleted}} >
        <div className="bg-[#172842] min-h-screen py-8">
                  <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                      <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                      <div className="mb-4">
                          {/* Todo form goes here */} 
                          <TodoForm />
                      </div>
                      <div className="flex flex-wrap gap-y-3">
                          {/*Loop and Add TodoItem here */}
                          {todos.map((todo)=><TodoItem key={todo.id} todo={todo}/>)}
                      </div>
                  </div>
              </div>
      </TodoContextProvider>
    )
}

export default App
