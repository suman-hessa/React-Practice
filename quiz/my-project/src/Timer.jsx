import React, { useEffect } from "react";
import {useState, useRef} from "react";
import useRenderCount from "./components/useRenderCount";

export default function Timer(){
    const renderCount = useRenderCount();
    const [count, setCount] = useState(10);
    const [isRunning, setIsRunning] = useState(false)
    function timerFunction(){
        setIsRunning(true);
    }

    useEffect(()=>{
        console.log("inside useEffect");
        if(!isRunning) {
            console.log('here')
            return;
        } 
        if(count === 0) {
            setIsRunning(false);
            return;
        }
        
        const timerId = setTimeout(()=>{
            setCount(count-1);
        }, 1000)

        return ()=> clearTimeout(timerId);
        }, [count, isRunning])

    return (
        <div className="bg-slate-400 h-screen w-screen flex justify-center items-center">
            <div className="bg-slate-50 h-5/12 w-6/12 rounded-xl flex flex-col justify-around items-center gap-4">
                <span  className="text-2xl font-semibold">{`Countdown: ${count}`}</span>
                <button className="bg-purple-400 hover:bg-purple-500 text-white px-2 py-1 rounded-lg text-lg font-semibold cursor-pointer" onClick={timerFunction}>Start Countdown</button>
                <div>
                    {`isRunning: ${isRunning}`}
                </div>
            </div>
        </div>
    )
}