import { SvgElements } from './SvgElements';

import "../styles/loader-component.scss"

interface props {
    status: "await" | "error"
}

export const LoaderComponent = ({ status }: props) => 
    <div className='loader-component'>
        {
            status === "await" ? <>
                <SvgElements className='spinner' element='spinner'/>
                <p>Cargando</p>
            </> :
            status === "error" ? <>
                <SvgElements className='error' element='xmark'/>
                <p className='error'>Error</p>
            </>

            : null
        }
    </div>
