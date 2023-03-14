import { SvgElements } from "./SvgElements"

import "../styles/menu-controller-products.scss"
import { useContext } from 'react';
import { ContextModal } from '../providers/Modal/ProviderModal';

export const MenuControllerProducts = () => {
    const { dispatchModal } = useContext(ContextModal);

    const onModalCreate = () => {
        dispatchModal({type: "Change modal-create-product"})
    }

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