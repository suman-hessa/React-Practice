import { useState } from "react";
import useRenderCount from "./useRenderCount";

export default function Fruit(){

    let renderCount = useRenderCount();
    const fruits = ["Apple", "Banana", "Mango", "Guava", "Grapes"];

    const [index, setIndex] = useState(0);

    console.log('index', index);

    function handleClick(){
        if(index <= fruits.length){
            setIndex(index+1);
        }
        
    }


    return (
        <div className="h-screen w-screen bg-linear-to-br from-purple-400 to-purple-600 flex justify-center items-center">
            <div className="bg-white h-5/12 w-8/12 rounded-xl flex flex-col items-center">
                <div className="bg-slate-100 w-4/12 px-4 py-2 rounded-lg mt-10">
                    <span className="font-semibold">
                        {fruits[index]}</span>
                </div>
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-1 rounded-lg mt-4 cursor-pointer" onClick={handleClick}>Next</button>
                <h1 className="mt-4 text-lg">{`The component has rendered ${renderCount} times`}</h1>
            </div>
        </div>
    )
}