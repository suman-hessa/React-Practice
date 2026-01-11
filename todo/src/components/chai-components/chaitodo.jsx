import { useState } from "react"
import { Plus, Trash2, Check } from "lucide-react"

export default function TodoStart() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a todo app", completed: true },
    { id: 3, text: "Deploy to production", completed: false },
  ])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = () => {
    // TODO: Implement addTodo
    let id = todos.length + 1
    let text = newTodo
    let completed = false

    let newtodo = {
      id, text, completed
    }

    setTodos([...todos, newtodo]);
    setNewTodo('');
  }

  const toggleTodo = (id) => {
    // TODO: Implement toggleTodo
    todos.map(todo=>{
      if(todo.id == id){
        todo.completed = !todo.completed;
      }
    })

    setTodos([...todos]);
  }

  const deleteTodo = (id) => {
    // TODO: Implement deleteTodo
    const newtodoList = todos.filter(todo=>{
      return todo.id !==id;
    })

    setTodos([...newtodoList]);
  }

  const handleKeyPress = (e) => {
    // TODO: Implement handleKeyPress
    if(e.key == 'Enter'){
      addTodo();
    }
    
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white text-center mb-8">Todo App</h1>

        {/* Add Todo */}
    <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 outline-none focus:border-neutral-400"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center space-x-3 p-4 bg-neutral-800 border border-neutral-700 rounded-lg"
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className={
                  "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 " +
                  (todo.completed
                    ? "bg-green-600 border-green-600 text-white"
                    : "border-neutral-500 hover:border-neutral-400")
                }
              >
                {todo.completed && <Check className="w-3 h-3" />}
              </button>

              {/* Todo Text */}
              <span className={"flex-1 " + (todo.completed ? "text-neutral-500 line-through" : "text-white")}>
                {todo.text}
              </span>

              {/* Delete Button */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-neutral-500 hover:text-red-400 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {todos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-lg">No todos yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  )
}
