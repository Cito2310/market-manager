import axios from 'axios';
import { useContext } from 'react';

import { useForm } from '../hooks/useForm';
import { useResponseState } from '../hooks/useResponseState';

import { transformProductToAPI } from '../helpers/transformProductToAPI';
import { formatProduct } from '../helpers/formatProduct';

import { ContextModal } from '../providers/Modal/ProviderModal';
import { ContextDatabase } from '../providers/Database/ProviderDatabase';

import { InputText, InputSelect, InputNumber, ItemsResponse } from './';

import "../styles/modal-simple.scss"



export const ModalCreateProduct = () => {
    // GET TOKEN
    const { token, controllerProducts } = useContext(ContextDatabase);

    // IMPORT CONTEXT MODAL
    const { dispatchModal } = useContext(ContextModal);

    // CREATE FORM
    const {
        barcode,
        brand,
        category,
        price,
        size,
        name,
        unitType,

        onInputChange,
        formState
    } = useForm({
        barcode: "",
        brand: "",
        category: "superman",
        price: 0,
        size: 0,
        name: "",
        unitType: "g",
    })

    // FUNC EXIT MODAL
    const exitModal = () => { dispatchModal({type: "Change modal-none"}) };

    // FUNC CALL API MODIFY PRODUCT
    const { controllerRespState, respState } = useResponseState();

    const onCreateProductFetch = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()

        // call API Login
        controllerRespState.setStatusAwait()
        axios.post(
            `https://market-product-rest.onrender.com/api/product/`,
            transformProductToAPI( formState ),
            { headers: { token } }
        )
        .then(({ data }) => { 
            controllerRespState.setStatusDone()
            controllerProducts.add(formatProduct(data))
            setTimeout(exitModal,300)
        })
        .catch(error => {
            controllerRespState.setStatusError("Error")
        })
    }

    return (
        <>
            <div className="modal-container">
                <div className="modal-div-top">
                    <h2 className="title-modal">Crear Producto</h2>

                    <button className="btn-exit-modal" onClick={ exitModal }>
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>

                <form  onSubmit={onCreateProductFetch}>
                    <div className="modal-div-body">
                        <InputText
                            label="Codigo de Barra"
                            placeholder="Inserte el codigo de barra"
                            name="barcode"
                            value={barcode}
                            onChange={onInputChange}
                        />

                        <InputSelect
                            value={category}
                            name="category"
                            label="Categoria"
                            option={[
                                { label: "Spider Man", value: "spiderman" },
                                { label: "Superman", value: "superman" },
                                { label: "Iron Man", value: "ironman" },
                                { label: "Hulk", value: "hulk" },
                            ]}
                            onChange={onInputChange}
                        />

                        <InputText
                            label="Marca"
                            placeholder="Inserte el marca"
                            name="brand"
                            value={brand}
                            onChange={onInputChange}
                        />

                        <InputText
                            label="Tipo"
                            placeholder="Inserte el tipo"
                            name="name"
                            value={name}
                            onChange={onInputChange}
                        />

                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px"}}>
                            <InputNumber
                                label="Tamaño"
                                placeholder="Inserte el tamaño"
                                name="size"
                                value={size}
                                onChange={onInputChange}
                                length={{ min: 0 }}
                            />

                            <InputSelect
                                value={unitType}
                                name="unitType"
                                label="Unidad"
                                option={[
                                    { label: "g", value: "g" },
                                    { label: "kg", value: "kg" },
                                    { label: "ml", value: "ml" },
                                    { label: "l", value: "l" },
                                    { label: "oz", value: "oz" },
                                    { label: "cm3", value: "cm3" },
                                ]}
                                onChange={onInputChange}
                            />
                        </div>

                        <InputNumber
                            label="Precio"
                            placeholder="Inserte el precio"
                            name="price"
                            value={price}
                            length={{ min: 0 }}
                            onChange={onInputChange}
                        />

                    </div>

                    <div className="modal-div-footer">
                        <input type="submit" className="btn-modal primary" value="Crear"/>
                        <button  disabled={false} className="btn-modal secundary" onClick={exitModal}>Rechazar</button>
                        <ItemsResponse type={respState.status} errorMsg={respState.errorMsg}/>
                    </div>
                </form>
            </div>

            <div className="black-screen" />
        </>
    )
}