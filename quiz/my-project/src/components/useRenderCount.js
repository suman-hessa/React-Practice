import React from "react";
import {useEffect, useRef} from "react";

function useRenderCount(){
    const renderCount = useRef(0);

    useEffect(()=>{
        // updates renderCount every time the react-dom commits browser-dom render
        renderCount.current+=1;
        console.log(`Render Count: ${renderCount.current}`);
    })

    return renderCount.current;
}

export default useRenderCount;