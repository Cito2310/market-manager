import { useEffect, useState } from "react";

type funcKeypress = [RegExp, (key: string)=>void];

export function useKeyPress (...funcs: funcKeypress[]) {
    const [currentKeyPress, setCurrentKeyPress] = useState([""]);

    // function detect keypress 
    useEffect(() => {
        const handleKeypress = (event:any) => setCurrentKeyPress([event.key])
        document.addEventListener("keyup", handleKeypress);
        return () => document.removeEventListener("keyup", handleKeypress);
    }, [])
    
    // functions 
    useEffect(() => {
        funcs.map(funcKeypress => {
            if (funcKeypress[0].test(currentKeyPress[0])) {funcKeypress[1](currentKeyPress[0])}
        })
    
    }, [currentKeyPress])
}