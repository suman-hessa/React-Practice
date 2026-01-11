import React from "react";
import { useState, useEffect } from "react";

function useFetchWeatherData(city){
    const[data, setData] = useState([])

    useEffect(()=>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5ffe5ee4e6b5f919eeaacef136f663fb&units=metric`)
        .then(response=> response.json())
        .then(json =>{
            setData(json)
            })
        .catch(err=>console.log(`Error msg: ${err}`))
    }, [city])
    console.log("from custom hooks", data);
    return data;
}

export default useFetchWeatherData;