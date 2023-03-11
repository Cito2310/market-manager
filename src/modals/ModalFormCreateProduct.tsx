import { InputText } from "../input/InputText"
import "./modal-simple.scss"
import { useForm } from '../helpersAndHooks/useForm';
import { InputSelect } from '../input/InputSelect';
import { InputNumber } from '../input/InputNumber';

interface props {
    buttons: btnFunc[]
    title: string,
    funcExit: () => void
}

interface btnFunc {
    color: "primary" | "danger" | "secundary"
    handler: () => void
    label: string
}

export const ModalFormCreateProduct = ({ title, buttons, funcExit }: props) => {
    const {
        brand,
        category,
        size,
        type,
        unitType,
        price,

        onInputChange,
        onResetForm,
        formState
    } = useForm({
        brand: "",
        category: "spiderman",
        size: "",
        type: "",
        unitType: "g",
        price: "",
    })

    return (
        <>
            <div className="modal-container">
                <div className="modal-div-top">
                    <h2 className="title-modal">{title}</h2>

                    <button className="btn-exit-modal" onClick={funcExit}>
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>

                <form className="modal-div-body">
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
                            defaultValue={0}
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
                    {buttons.map(({ color, handler, label }, index) => <button
                        key={index + "BTN-MODAL"}
                        className={`btn-modal ${color === "primary" ? "primary"
                                : color === "secundary" ? "secundary"
                                    : color === "danger" ? "danger" : null
                            }`}
                        onClick={handler}
                    >{label}</button>)}
                </div>
            </div>

            <div className="black-screen" />
        </>
    )
}