import { use, useEffect, useRef } from "react";

function useRenderCount(){
    const renderCount = useRef(0);

    useEffect(()=>{
        renderCount.current += 1;
    })

    return renderCount.current;

}

export default useRenderCount;