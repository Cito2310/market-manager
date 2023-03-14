import { useContext } from "react";
import axios from 'axios';

import { InputText } from "../input/InputText"
import { InputSelect } from '../input/InputSelect';
import { InputNumber } from '../input/InputNumber';

import { ContextModal } from '../providers/Modal/ProviderModal';

import { useForm } from '../helpersAndHooks/useForm';

import "./modal-simple.scss"


export const ModalFormCreateProduct = () => {
    const {
        barcode,
        brand,
        category,
        price,
        size,
        type,
        unitType,

        onInputChange,
    } = useForm({
        barcode: "",
        brand: "",
        category: "spiderman",
        price: "0",
        size: "0",
        type: "",
        unitType: "g",
    })

    const { dispatchModal } = useContext(ContextModal);
    const exitModal = () => { dispatchModal({type: "Change modal-none"}) };

    // const createProductFetch = async () => {
    //     axios.post("", {Headers})
    // }

    return (
        <>
            <div className="modal-container">
                <div className="modal-div-top">
                    <h2 className="title-modal">Crear Producto</h2>

                    <button className="btn-exit-modal" onClick={ exitModal }>
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>

                <form className="modal-div-body">
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
                        name="type"
                        value={type}
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

                </form>

                <div className="modal-div-footer">
                    <button className="btn-modal primary" onClick={()=>{}}>Crear</button>
                    <button className="btn-modal secundary" onClick={exitModal}>Rechazar</button>
                </div>
            </div>

            <div className="black-screen" />
        </>
    )
}