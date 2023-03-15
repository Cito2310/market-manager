import { useContext } from "react";
import axios from 'axios';

import { InputText } from "../input/InputText"
import { InputSelect } from '../input/InputSelect';
import { InputNumber } from '../input/InputNumber';

import { ContextModal } from '../providers/Modal/ProviderModal';

import { useForm } from '../helpersAndHooks/useForm';

import "./modal-simple.scss"
import { ItemsResponse } from "../components/ItemsResponse";
import { useResponseState } from '../hooks/useResponseState';

interface props {
    token: string
}

export const ModalFormCreateProduct = ({ token }: props) => {
    const {
        barcode,
        brand,
        category,
        price,
        size,
        name,
        unitType,

        onInputChange,
        formState,
    } = useForm({
        barcode: "",
        brand: "",
        category: "spiderman",
        price: 0,
        size: 0,
        name: "",
        unitType: "g",
    })

    const { dispatchModal } = useContext(ContextModal);
    const exitModal = () => { dispatchModal({type: "Change modal-none"}) };

    // RESP CONTROLLER
    const { controllerRespState, respState } = useResponseState();

    const onCreateProductFetch = async ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()

        controllerRespState.setStatusAwait()
        axios.post(
            "https://market-product-rest.onrender.com/api/product/",
            formState,
            { headers: {token} }
        )
            .then( resp => {
                controllerRespState.setStatusDone();
            })
            .catch( error => {
                console.log(error.response.data)
                controllerRespState.setStatusError("Error");
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

                <form onSubmit={onCreateProductFetch}>
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
                        <button className="btn-modal secundary" onClick={exitModal}>Rechazar</button>
                        <ItemsResponse type={respState.status} errorMsg={respState.errorMsg}/>
                    </div>
                </form>
            </div>

            <div className="black-screen" />
        </>
    )
}