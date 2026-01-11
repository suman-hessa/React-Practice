import { useState } from "react"
import { Plus, Edit2, Trash2, Check, X } from "lucide-react"

export default function SimpleTodo() {
  const [newTodo, setNewTodo] = useState("")
  const [filter, setFilter] = useState("all")
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")

  // Mock data for display purposes
  const mockTodos = [
    { id: 1, text: "Complete project documentation", completed: false },
    { id: 2, text: "Review pull requests", completed: true },
    { id: 3, text: "Update dependencies", completed: false },
    { id: 4, text: "Write unit tests", completed: false },
    { id: 5, text: "Deploy to staging", completed: true },
  ]

  const activeTodos = mockTodos.filter((todo) => !todo.completed)
  const completedTodos = mockTodos.filter((todo) => todo.completed)

  const getFilteredTodos = () => {
    if (filter === "active") return activeTodos
    if (filter === "completed") return completedTodos
    return mockTodos
  }

  const filteredTodos = getFilteredTodos()

  // button functions 

  const addTodo = ()=>{
    const newTodo = {
        id: todos.length+1,
        text: {newTodo},
        completed: false
    }

    mockTodos.append(newTodo);
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Todo List</h1>
          <p className="text-neutral-400 text-base">Stay organized and get things done over a cup of chai</p>
        </div>

        {/* Add Todo Section */}
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 mb-6">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo..."
                className="w-full px-4 py-3.5 bg-neutral-800 border-2 border-neutral-600 hover:border-neutral-500 focus:border-orange-500 rounded-xl text-white placeholder-neutral-500 outline-none transition-colors duration-200"
              />
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors duration-200 flex items-center space-x-2" onClick={addTodo}>
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-2 mb-6">
          <div className="flex space-x-1">
            {[
              { key: "all", label: "All", count: mockTodos.length },
              { key: "active", label: "Active", count: activeTodos.length },
              { key: "completed", label: "Completed", count: completedTodos.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={
                  "flex-1 px-4 py-2.5 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2 " +
                  (filter === tab.key
                    ? "bg-orange-500 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800")
                }
              >
                <span>{tab.label}</span>
                <span
                  className={
                    "px-2 py-0.5 rounded-full text-xs font-semibold " +
                    (filter === tab.key ? "bg-orange-600 text-white" : "bg-neutral-700 text-neutral-300")
                  }
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Todo List */}
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden">
          {filteredTodos.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-neutral-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No todos found</h3>
              <p className="text-neutral-400">
                {filter === "all" && "Add your first todo to get started"}
                {filter === "active" && "All tasks completed! Great job!"}
                {filter === "completed" && "No completed tasks yet"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-700">
              {filteredTodos.map((todo, index) => (
                <div
                  key={todo.id}
                  className={
                    "p-4 flex items-center space-x-4 hover:bg-neutral-800/50 transition-colors duration-200 " +
                    (todo.completed ? "opacity-60" : "")
                  }
                >
                  {/* Checkbox */}
                  <button
                    className={
                      "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors duration-200 " +
                      (todo.completed
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "border-neutral-600 hover:border-orange-500")
                    }
                  >
                    {todo.completed && <Check className="w-4 h-4" />}
                  </button>

                  {/* Todo Content */}
                  <div className="flex-1 min-w-0">
                    {editingId === todo.id ? (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 px-3 py-2 bg-neutral-800 border-2 border-orange-500 rounded-lg text-white outline-none"
                          autoFocus
                        />
                        <button className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200">
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <p className={"text-base " + (todo.completed ? "line-through text-neutral-500" : "text-white")}>
                        {todo.text}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {editingId !== todo.id && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingId(todo.id)
                          setEditText(todo.text)
                        }}
                        className="p-2 text-neutral-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors duration-200"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {mockTodos.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="text-neutral-400 text-sm">
              {activeTodos.length} of {mockTodos.length} tasks remaining
            </div>

            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-600 hover:border-neutral-500 rounded-lg font-medium transition-colors duration-200">
                Mark All Complete
              </button>

              {completedTodos.length > 0 && (
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200">
                  Clear Completed ({completedTodos.length})
                </button>
              )}
            </div>
          </div>
        )}

        {/* Stats Card */}
        <div className="mt-8 bg-neutral-900 border border-neutral-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-neutral-800 rounded-xl">
              <div className="text-2xl font-bold text-white mb-1">{mockTodos.length}</div>
              <div className="text-sm text-neutral-400">Total Tasks</div>
            </div>
            <div className="text-center p-4 bg-neutral-800 rounded-xl">
              <div className="text-2xl font-bold text-orange-500 mb-1">{activeTodos.length}</div>
              <div className="text-sm text-neutral-400">Active Tasks</div>
            </div>
            <div className="text-center p-4 bg-neutral-800 rounded-xl">
              <div className="text-2xl font-bold text-green-500 mb-1">{completedTodos.length}</div>
              <div className="text-sm text-neutral-400">Completed</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-neutral-400 mb-2">
              <span>Progress</span>
              <span>{Math.round((completedTodos.length / mockTodos.length) * 100)}%</span>
            </div>
            <div className="w-full bg-neutral-700 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: (completedTodos.length / mockTodos.length) * 100 + "%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
