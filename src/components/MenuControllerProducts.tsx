import { useContext } from 'react';
import { SvgElements } from "./"
import { ContextModal } from '../providers';
import "../styles/menu-controller-products.scss"


export const MenuControllerProducts = () => {
    const { setCurrentModal } = useContext(ContextModal);

    const onModalCreate = () => { setCurrentModal("create-product") }

    // TODO : Crear funcion para desplegar el modal para buscar un producto y asignarlo al boton lens

    return (
        <div className="menu-controller-products">
            <button>
                <SvgElements element="lens"/>
            </button>

            <button onClick={onModalCreate}>
                <SvgElements element="plus"/>
            </button>
        </div>
    )
}