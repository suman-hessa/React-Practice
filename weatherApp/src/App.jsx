import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useFetchWeatherData from './customHooks/useFetchWeatherData.js'
import { Search } from 'lucide-react'

function App() {

  const[input, setInput] = useState('')
  const[city, setCity] = useState('Ranchi')

  const weatherInfo = useFetchWeatherData(city)
  const imageUrl = `https://openweathermap.org/img/wn/${weatherInfo?.weather?.[0]?.icon}@2x.png`
  const temperature = Math.round(Number(weatherInfo?.main?.temp));
  const country = weatherInfo?.sys?.country;
 
  const getWeather = ()=>{
    setCity(input)
    setInput("")
  }

  return (
    <div className='bg-blue-300 h-screen w-screen grid place-items-center capitalize'>
      <div className='bg-gray-500 h-90 w-80 rounded-xl p-4 flex flex-col items-center'>
        <div className='flex flex-row gap-4'>
          <input 
        type="text" 
        name="city" 
        id="city"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        className='bg-white px-2 py-2 rounded-xl outline-none text-gray-700 text-lg'
        />
        <button  
        onClick={getWeather}
        className='bg-blue-300 size-11 rounded-full grid place-items-center cursor-pointer'>
        <Search />
        </button>
        </div>
        <div className=' h-full w-full rounded-xl mt-5 flex flex-col items-center gap-1'>
        <img className="bg-blue-200 h-7/12 w-6/12 rounded-xl mt-4" src={imageUrl} alt="weather_img" />
        <h1 className='text-white text-2xl font-semibold'>{city.toLowerCase()}  {country} </h1>
        <div className='h-full w-full flex justify-around mt-4'>
                  <h2 className='text-white text-2xl font-semibold'>{temperature}°C</h2>
                <h2 className='text-white text-2xl font-semibold'>{weatherInfo?.weather?.[0]?.main}</h2>
        </div>
        </div>
      </div>
    </div>
  )
}

export default App
