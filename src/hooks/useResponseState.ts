import { useState } from 'react';

export const useResponseState = () => {
    interface IRespState {
        status: "error" | "await" | "done" | "none"
        errorMsg: string
    }
    const [respState, setRespState] = useState<IRespState>({
        status: "none",
        errorMsg: ""
    })
    const controllerRespState = {
        setStatusDone: () => {setRespState({...respState, status: "done"})},
        setStatusNone: () => {setRespState({...respState, status: "none"})},
        setStatusError: (msg: string) => {setRespState({...respState, status: "error", errorMsg: msg})},
        setStatusAwait: () => {setRespState({...respState, status: "await"})},
    }

    return {
        respState,
        controllerRespState
    }
}