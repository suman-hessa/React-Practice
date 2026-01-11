import { useState, useCallback, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const[length, setLength] = useState(8)
  const[numberAllowed, setNumberAllowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(false)
  const[password, setPassword] = useState('')

  const randomNumber = useCallback((min, max)=>{
    return Math.floor(Math.random() * (max-min) + min);
  },[])

  const generatePassword = useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numberAllowed) str+= '0123456789'
    if(charAllowed) str+= '!@#$%^&*'

    for(let i = 0;i< length;i++){
      console.log(str);
      const randomNum = randomNumber(0, str.length);
      pass += str.charAt(randomNum);
    }
    setPassword(pass);
  }, 
  [length, numberAllowed, charAllowed, setPassword]);
  
  

  return (
    <div className='flex justify-center items-center w-full mt-50'>
      <div className="bg-white h-[200px] w-md rounded-2xl shadow-lg px-4 py-2 flex flex-col items-center ">
      <h1 className="text-xl font-semibold">Random Password Generator</h1>
      <div className="grid grid-cols-12 w-full my-5">
        <input className="bg-slate-100 px-4 text-gray-800 rounded-l-2xl outline-none col-span-9" type="text" placeholder="Your password here..." 
        value={password}
        readOnly
        />
      <button className="bg-pink-400 hover:bg-pink-500 px-4 py-2 rounded-r-2xl cursor-pointer text-white col-span-3"
      onClick={generatePassword}
      >Generate</button>
      </div>
      <button className="bg-purple-400 hover:bg-purple-500 cursor-pointer text-white px-4 py-1 rounded-2xl text-center w-4/12 place-items-center">Copy</button>
      <div className="mt-3 flex justify-between w-full">
        <label htmlFor="passwordLength">
          <input type="range" name="passwordLength" id="passwordLength" min="8" max="25" />
          length
          </label>
        <label htmlFor="numberAllowed">
          <input type="checkbox" name="number" id="numberAllowed" 
          defaultChecked={numberAllowed}
          onChange={(e)=>setNumberAllowed((prev)=>!prev)}
          />
          number</label>
        <label htmlFor="charAllowed">
          <input type="checkbox" name="character" id="charAllowed" />
          Character
          </label>
      </div>
  </div>
    </div>
  )
}

export default App
