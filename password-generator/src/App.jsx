import { useCallback, useEffect, useState, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  function randomNumber(min, max){
    return Math.floor(Math.random() * (max-min) + min);
  }

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, length)
    window.navigator.clipboard.writeText(password);
  }, [password])

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

  useEffect(()=>{
    generatePassword()
  }, [length, numberAllowed, charAllowed])

  return (
    <>
      <div className='w-full mx-auto max-w-md bg-slate-600 shadow-md rounded-lg px-4 my-8 text-blue-orange'>
        <h1 className='my-3 text-white'>Password Generator</h1>
        <div className='flex flex-row my-3'>
          <input 
          type="text"
          value={password}
          placeholder="password"
          readOnly
          ref={passwordRef}
          className='bg-white text-gray-700 px-4 py-1 w-full rounded-lg'
          />
          <button className='px-2 py-1 bg-blue-300 hover:bg-blue-400 rounded-lg cursor-pointer'
          onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>
        <div className='flex flex-row gap-2 text-white'>
        <input type="range"
         name="rangeInput" 
         id="range" 
         min={8}
         max={25}
         value={length}
         onChange={(e)=>setLength(e.target.value)}
         />
         <label htmlFor="range">{`length (${length})`}</label>
         <input type="checkbox"
          name="number" 
          id="numberAllowed"
          defaultChecked={numberAllowed}
          onChange={(e)=>setNumberAllowed((prev)=>!prev)}
          />
          <label htmlFor="numberAllowed">Number</label>
          <input type="checkbox" 
          name="char" 
          id="charAllowed" 
          defaultChecked={charAllowed}
          onChange={(e)=>setCharAllowed((prev)=> !prev)}
          />
          <label htmlFor="charAllowed">Character</label>
        </div>
      </div>
    </>
 
  )
}

export default App
