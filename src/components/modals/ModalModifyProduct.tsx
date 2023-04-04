import axios from 'axios';
import { useContext } from 'react';

import { useForm } from '../../hooks/useForm';
import { useResponseState } from '../../hooks/useResponseState';

import { transformProductToAPI } from '../../helpers/transformProductToAPI';
import { formatProduct } from '../../helpers/formatProduct';

import { ContextModal, ContextDatabase } from '../../providers';

import { InputNumber, InputSelect, InputText, ItemsResponse } from '../';
import { SvgElements } from '../SvgElements';



export const ModalModifyProduct = () => {
    // GET TOKEN
    const { token, controllerProducts, categories } = useContext(ContextDatabase);

    // IMPORT CONTEXT MODAL
    const { exitModal, productSelected } = useContext(ContextModal);

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
        barcode: productSelected!.barcode,
        brand: productSelected!.brand.toLocaleUpperCase(),
        category: productSelected!.category.toLocaleLowerCase(),
        name: productSelected!.name,
        price: productSelected!.price,
        size: productSelected!.sizeUnit[0],
        unitType: productSelected!.sizeUnit[1].toLocaleLowerCase(),
    })

    // FUNC CALL API MODIFY PRODUCT
    const { controllerRespState, respState } = useResponseState();

    const onCreateProductFetch = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()

        // call API Login
        controllerRespState.setStatusAwait()
        axios.put(
            `https://market-product-rest.onrender.com/api/product/${barcode}`,
            transformProductToAPI( formState ),
            { headers: { token } }
        )
        .then(({ data }) => { 
            controllerRespState.setStatusDone()
            controllerProducts.modify(formatProduct(data))
            setTimeout(exitModal,300)
        })
        .catch(error => {
            controllerRespState.setStatusError("Error")
        })
    }
    
    return (
        <>
            <div className="modal-container">
                <div className="row sb">
                    <h2>Editar Producto</h2>

                    <button onClick={ exitModal } className="btn-exit"><SvgElements element="xmark"/></button>
                </div>

                <form  onSubmit={onCreateProductFetch}>
                    <div className="body-container">
                        <InputSelect
                            value={category.toUpperCase()}
                            name="category"
                            label="Categoria"
                            option={categories.map( item =>({ label: item.category, value: item.category }) )}
                            onChange={onInputChange}
                        />

                        <InputSelect
                            value={brand}
                            name="brand"
                            label="Marca"
                            option={[{label: "", value: ""}, ...categories.find( item => item.category === category.toUpperCase() )?.brands.map( item =>({label: item, value: item}))||[]]}
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
                                decimal
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
                                    { label: "cc", value: "cc" },
                                    { label: "u", value: "u" },
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

                    <div className="row gap-12 reverse">
                        <button disabled={respState.status === "await" ? true : false} type="submit" className="btn primary" value="Editar">Editar</button>
                        <button disabled={respState.status === "await" ? true : false} className="btn secondary" onClick={exitModal}>Rechazar</button>
                        <ItemsResponse type={respState.status} errorMsg={respState.errorMsg}/>
                    </div>
                </form>
            </div>

            <div className="black-screen" />
        </>
    )
}