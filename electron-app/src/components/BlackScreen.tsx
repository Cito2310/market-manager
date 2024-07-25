import { useEffect } from 'react';

interface props {
    onClick?: () => void
}

export const BlackScreen = ({ onClick }: props) => {
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => { document.body.style.overflow = "visible" }
    }, [])
    

    return <div onClick={ onClick } className='fixed top-0 left-0 w-screen h-screen z-10 bg-black bg-opacity-25'/>
}