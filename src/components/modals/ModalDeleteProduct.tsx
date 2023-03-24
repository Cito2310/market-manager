import axios from 'axios';
import { useContext } from 'react';

import { useResponseState } from '../../hooks/useResponseState';

import { ContextModal, ContextDatabase } from '../../providers';

import { SvgElements } from '../';

import { IProductFormat } from '../../../Types/product';



export const ModalDeleteProduct = () => {
    const { token, controllerProducts } = useContext(ContextDatabase);
    const { exitModal, productSelected } = useContext(ContextModal);

    // FUNC CALL API MODIFY PRODUCT
    const { controllerRespState, respState } = useResponseState();

    const onDeleteProduct = () => {
        controllerRespState.setStatusAwait()
        axios.delete(
            `https://market-product-rest.onrender.com/api/product/${productSelected!.barcode}`,
            { headers: { token } }
        )
        .then(() => { 
            controllerRespState.setStatusDone()
            controllerProducts.delete( productSelected as IProductFormat )
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
                <div className="row sb">
                    <h2>Eliminar Producto</h2>

                    <button className="btn-exit" onClick={exitModal}><SvgElements element="xmark"/></button>
                </div>

                <div className="body-container">
                    <p>Seguro que deseas eliminar este producto?</p>
                </div>

                <div className="row gap-12 reverse">
                    {
                        respState.status === "none" ?
                            <button className="btn primary w6" onClick={onDeleteProduct}>Eliminar</button> :

                        respState.status === "await" ?
                            <button className="btn loading w6" disabled onClick={onDeleteProduct}><SvgElements element="spinner"/></button> :

                        respState.status === "done" ?
                            <button className="btn done w6" disabled onClick={onDeleteProduct}><SvgElements element="done"/> Done</button> :

                        respState.status === "error" ?
                            <button className="btn error w6" disabled onClick={onDeleteProduct}><SvgElements element="xmark"/> Error</button> :

                        null
                    }
                    <button disabled={respState.status === "await" ? true : false} className="btn secondary w6" onClick={exitModal}>Rechazar</button>
                </div>
            </div>

            <div className="black-screen" />
        </>
    )
}