import axios from 'axios';
import { useContext } from 'react';

import { useResponseState } from '../hooks/useResponseState';

import { ContextModal } from '../providers/Modal/ProviderModal';
import { ContextDatabase } from '../providers/Database/ProviderDatabase';

import { ItemsResponse, CardProduct } from './';

import "../styles/modal-simple.scss"



export const ModalDeleteProduct = () => {
    // GET TOKEN
    const { token, controllerProducts } = useContext(ContextDatabase);

    // IMPORT CONTEXT MODAL
    const { dispatchModal, productSelected } = useContext(ContextModal);

    // FUNC EXIT MODAL
    const exitModal = () => { dispatchModal({type: "Change modal-none"}) };

    // FUNC CALL API MODIFY PRODUCT
    const { controllerRespState, respState } = useResponseState();

    const onDeleteProduct = () => {
        // call API Login
        controllerRespState.setStatusAwait()
        axios.delete(
            `https://market-product-rest.onrender.com/api/product/${productSelected.barcode}`,
            { headers: { token } }
        )
        .then(() => { 
            controllerRespState.setStatusDone()
            controllerProducts.delete( productSelected )
            setTimeout(exitModal,300)
        })
        .catch(error => {
            console.log(error)
            controllerRespState.setStatusError("Error")
        })
    }


    return (
        <>
            <div className="modal-container">
                <div className="modal-div-top">
                    <h2 className="title-modal">Eliminar Producto</h2>

                    <button className="btn-exit-modal" onClick={ exitModal }>
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>

                <div className="modal-div-body">
                    <p>Seguro que deseas eliminar este producto?</p>

                    <CardProduct product={productSelected} />
                </div>

                <div className="modal-div-footer">
                    <button autoFocus className="btn-modal primary" onClick={onDeleteProduct}>Eliminar</button>
                    <button  disabled={true} className="btn-modal secundary" onClick={exitModal}>Rechazar</button>
                    <ItemsResponse type={respState.status} errorMsg={respState.errorMsg}/>
                </div>
            </div>

            <div className="black-screen" />
        </>
    )
}