import { InputText } from "../input/InputText"
import "./modal-simple.scss"
import { useForm } from '../helpersAndHooks/useForm';
import { InputSelect } from '../input/InputSelect';

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

export const ModalFormCreateProduct = ({title, buttons, funcExit}: props) => {
    const {
        category,
        size,
        type,

        onInputChange,
        onResetForm,
        formState
    } = useForm({
        category: "spiderman",
        size: "",
        type: "",
    })

    return (
        <>
            <div className="modal-container">
                <div className="modal-div-top">
                    <h2 className="title-modal">{title}</h2>

                    <button className="btn-exit-modal" onClick={funcExit}>
                        <i className="fa-solid fa-xmark"/>
                    </button>
                </div>

                <form className="modal-div-body">
                    <InputText
                        label="Tipo"
                        placeholder="Inserte el tipo"
                        name="type"
                        value={type}
                        onChange={onInputChange}
                    />

                    <InputSelect
                        value={category}
                        name="category"
                        label="Select"
                        option={[
                            { label: "Spider Man", value: "spiderman" },
                            { label: "Superman", value: "superman" },
                            { label: "Iron Man", value: "ironman" },
                            { label: "Hulk", value: "hulk" },
                        ]}
                        onChange={onInputChange}
                    />
                </form>

                <div className="modal-div-footer">
                    { buttons.map(({ color, handler, label }, index) => <button
                        key={index+"BTN-MODAL"}
                        className={`btn-modal ${
                            color === "primary" ? "primary"
                            : color === "secundary" ? "secundary"
                            : color === "danger" ? "danger" : null
                        }`}
                        onClick={handler}
                    >{ label }</button> )}
                </div>
            </div>

            <div className="black-screen"/>
        </>
    )
}