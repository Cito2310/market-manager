import { useEffect, useState } from 'react';

export const useKeyUp = () => {
    const [currentKeyPress, setCurrentKeyPress] = useState<[ string ]>([""]);

    const detectInput = ( event: KeyboardEvent ) => {
        setCurrentKeyPress( [ event.key ] );
    }

    useEffect(() => {
        document.addEventListener( "keyup", detectInput );
        return () => { document.removeEventListener( "keyup", detectInput ) };

    }, [ currentKeyPress ])

    return currentKeyPress;
}