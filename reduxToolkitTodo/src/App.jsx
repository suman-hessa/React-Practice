import { useState } from 'react'
import Todo from './components/Todo.jsx'
import AddTodo from './components/AddTodo.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-50 min-w-2xl rounded-lg p-2'>
    <AddTodo />
    <Todo />
    </div>
  )
}

export default App
