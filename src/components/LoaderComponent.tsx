import { SvgElements } from './';
import "../styles/loader-component.scss"

export const LoaderComponent = () => 
    <div className='loader-component'>
        <SvgElements className='spinner' element='spinner'/>
        <p>Cargando</p>
    </div>
