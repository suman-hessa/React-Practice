import React from "react";
import { useState, useEffect, useRef} from "react";
import { Plus, Trash2, Check, Calendar, SquarePen } from "lucide-react";

export const Filter = ({button})=>{
  <button className='border border-white h-full rounded-lg px-2 py-1 w-2/12 flex gap-2 items-center justify-center cursor-pointer hover:bg-amber-300 hover:text-slate-800'>
      <span>{button.label}</span>
      <span className="bg-slate-200 text-slate-800 rounded-full size-4 flex justify-center items-center text-sm">{button.length}</span>
    </button>
}
    

export function UpdateForm(){
    return (
        <div className="min-h-[150px] w-8/12 bg-purple-300 rounded-lg p-4 flex flex-col items-center gap-4 absolute top-0">
        <p className=" text-xl font-semibold">Update form</p>
        <div className="flex flex-row gap-2">
        <input type="text" placeholder="Add todo..." className="bg-white rounded-lg px-2 py-1 text-gray-700" />
        <button className=" cursor-pointer bg-blue-400 hover:bg-blue-500 px-3 py-0.5 rounded-lg">Add</button>
        </div>
        <button className="cursor-pointer bg-blue-400 hover:bg-blue-500 px-3 py-0.5 rounded-lg mt-5">Cancel</button>
        </div>
    )
}

function Todo({todo, toggle, del}) {
  return (
    <>
        <div className="min-h-10 w-full border border-white rounded-lg flex items-center justify-between px-2">
                <button
                  className={
                    "rounded-full border-2 flex justify-center items-center size-6 cursor-pointer hover:border-neutral-400 " +
                    (todo.completed
                      ? "bg-orange-500 border-orange-500 hover:border-orange-400"
                      : "border-neutral-500")
                  }
                  onClick={() => {toggle(todo.id)}}
                >
                  {todo.completed && <Check size={16} />}
                </button>
                <span className={"text-xl " + (todo.completed?"text-neutral-500 line-through":"text-white")}>{todo.title}</span>
                <button className={"cursor-pointer " + (todo.completed? "text-neutral-500": "text-white")} onClick={()=> {update(todo.id)}}>
                    <SquarePen />
                </button>
                <button
                  className="text-red-400 rounded-full cursor-pointer hover:text-red-600"
                  onClick={() => {del(todo.id)}}
                >
                  <Trash2 />
                </button>
              </div>
    </>
  )
}

export default function TodoApp() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [filter, setFilter] = useState(JSON.parse(localStorage.getItem('filter')) || "");
  const [percentage, setPercentage] = useState(localStorage.getItem('progress') || 0)

  let number = 30;
  const handleChange = (event) => {
            setInputText(event.target.value);
  };

  // CRUD - Create new task
  const addTask = () => {
    if(inputText === ''){
        alert("Input field cannot be left empty!")
    }
    else{
        const newTodo = {
        id: items.length + 1,
        title: inputText,
        completed: false,
        };

        setItems([...items, newTodo]);
        setInputText("");
    }
    
  };

  // CRUD - Delete todo
  const deleteTodo = (id) => {
    const newtodos = items.filter((todo) => {
      return todo.id != id;
    });
    console.log("Delete button was clicked");
    setItems([...newtodos]);
  };

  // CRUD - Update todo done status
  const toggleDoneStatus = (id) => {
    items.map((todo) => {
      if (todo.id == id) {
        todo.completed = !todo.completed;
      }
    });
    console.log("checkbox was clicked");

    setItems([...items]);
  };

  // CRUD - Update todo

  // useEffect() method for storing todos to localstorage
  useEffect(()=>{
      localStorage.setItem('todos', JSON.stringify(items))
      localStorage.setItem('filter', JSON.stringify(filter))
      calculatePercentage()
      localStorage.setItem('percentage', percentage)
  }, [items, filter]);

  const activeTodos = items.filter(todo=> !todo.completed)
  const completedTodos = items.filter(todo=> todo.completed)

  // here, filter comes from useState
  function getFilteredTodos(){
    if(filter === 'active'){return activeTodos}
    else if(filter === 'completed'){return completedTodos}
    else{
        return items
    }
  }

    const filterButtons = [
    {tab: "all", label: "All", length: items.length},
    {tab: "active", label: "Active", length: activeTodos.length},
    {tab: "completed", label: "Completed", length: completedTodos.length}
  ]

  const filteredTodos = getFilteredTodos()

  function markAllComplete(){
    items.map(todo=>{
      if(!todo.completed){
        todo.completed = true;
      }
    })
    setItems([...items])
  }

  function clearComplete(){
    const newList = items.filter(todo=>!todo.completed);
    setItems([...newList]);
  }

  function calculatePercentage(){
    let totalTasks = items.length;
    let completedTasks = completedTodos.length;
    const percentage = Math.floor
    (((completedTasks/totalTasks) *100))
    console.log(typeof(percentage))
    setPercentage(percentage);
    return percentage;
  }

  return (
    <>
      {/* container */}
      <div className="border w-[400px] min-h-[250px] flex flex-col items-center rounded-lg py-2 px-4">
        <header className="flex w-full h-12 justify-center items-center gap-2">
            <h1 className="text-xl">Todo</h1>
            <Calendar size={48}/> 
        </header>
           
        {/* input */}
        <div className="flex justify-around gap-2 mt-4 w-full">
          <input
            type="text"
            value={inputText}
            className="h-12 border px-4 py-2 text-lg rounded-lg w-9/12"
            placeholder="Your task here..."
            onChange={handleChange}
          />
          {/* button */}
          <button
            className="w-2/12 bg-blue-500 h-12 flex justify-center items-center rounded-xl cursor-pointer"
            onClick={addTask}
          >
            <Plus size={20} />
          </button>
        </div>
        {/* filter */}
        <div className="text-white bg-slate-600 w-full h-10 rounded-lg px-2 py-1 flex gap-4 mt-5">
        {filterButtons.map(button=>
        <button key={button.tab} className={'border border-white h-full rounded-lg px-2 py-1 w-4/12 flex gap-2 items-center justify-center cursor-pointer ' + (filter == button.tab && "bg-amber-300 text-slate-700")} onClick={()=> setFilter(button.tab)}>
      <span>{button.label}</span>
      <span className="bg-slate-200 text-slate-800 rounded-full size-4 flex justify-center items-center text-sm">{button.length}</span>
      </button>)}
        </div>
        {/* tasks */}
        <ul className="mt-4 w-full space-y-2">
          {filteredTodos.map(todo =><li key={todo.id}><Todo todo={todo} toggle={toggleDoneStatus} del={deleteTodo}/></li>)}
        </ul>
        {/* multi function buttons */}
        <div className="flex gap-4 mt-4">
          <span>{`${activeTodos.length} of ${items.length} tasks remaining`}</span>
          <button className="border border-neutral-500 bg-neutral-600 rounded-lg cursor-pointer hover:bg-neutral-700" onClick={markAllComplete}>Mark all complete</button>
          <button className="bg-amber-500 rounded-lg cursor-pointer hover:bg-amber-600" onClick={clearComplete}>
            Clear completed
            <span>{`(${completedTodos.length})`}</span>
          </button>
        </div>
        {/* statistics */}
        <div className="flex flex-col border border-neutral-500 w-full mt-4 rounded-lg gap-2 p-2">
          <p className="flex item-start ml-5">Statistics</p>
          <div className="flex w-full justify-around">
            <div className="border border-neutral-500 rounded-lg px-2 py-1 flex flex-col">
              <span>{items.length}</span>
              <span>Total Tasks</span>
            </div>
            <div className="border border-neutral-500 rounded-lg px-2 py-1 flex flex-col">
              <span>{activeTodos.length}</span>
              <span>Active Tasks</span>
            </div>
            <div className="border border-neutral-500 rounded-lg px-2 py-1 flex flex-col">
              <span>{completedTodos.length}</span>
              <span>Completed</span>
            </div>
          </div>
        </div>
        {/* progress */}
        <div className="mt-2 w-full">
          <div className="flex justify-around w-full">
            <span>Progress</span>
            <span>{`${percentage}%`}</span>
          </div>
          <div className="bg-slate-800 h-5 w-full rounded-xl mt-5">
           <div className={"bg-amber-400 h-5 rounded-xl " + `w-[${number}%]`} ></div>
          </div>
        </div>
      </div>
    </>
  );
}
