import {useEffect, useState} from "react";

export default function useDebounceValue(val,timeout=1000){
    const [debounceVal,setDebounceVal]=useState(val)
    useEffect(() => {
        const timeOut=setTimeout(()=>{
            setDebounceVal(val)
        },timeout)

        return ()=>{
            clearTimeout(timeOut)
        }
    }, [val]);

    return debounceVal;
}