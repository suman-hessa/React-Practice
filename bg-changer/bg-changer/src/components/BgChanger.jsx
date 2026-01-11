import React from "react";
import {useState, useEffect, useRef} from "react";
import useRenderCount from "./useRenderCount";

function BgChanger(){
    const renderCount = useRenderCount()
    const colors = ["red", "green", "blue"]

    const colorVarients = {
        red: "bg-red-400",
        green: "bg-green-400",
        blue: "bg-blue-400",
    }

    const [bgColor, setBgColor] = useState("olive");
    console.log("Render count: ", renderCount)
    return (
        <div className={`h-screen w-screen relative flex justify-center`} 
            style={{backgroundColor: bgColor}}>
            <div className="absolute w-10/12 h-16 px-4 py-2 bottom-10 bg-slate-500 flex justify-center gap-4" id="container">
            {   
                colors.map(color=>
                <button key={color} className={`px-4 py-1 rounded-xl cursor-pointer`} style={{backgroundColor: color}} onClick={()=> setBgColor(color)}>{color}</button>)
            }
            </div>
        </div>
    )
}

export default BgChanger;