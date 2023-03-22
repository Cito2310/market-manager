import axios from 'axios';
import { useContext } from 'react';

import { useForm } from '../hooks/useForm';
import { useResponseState } from '../hooks/useResponseState';

import { transformProductToAPI } from '../helpers/transformProductToAPI';
import { formatProduct } from '../helpers/formatProduct';

import { ContextModal } from '../providers/Modal/ProviderModal';
import { ContextDatabase } from '../providers/Database/ProviderDatabase';

import { InputText, InputSelect, InputNumber, ItemsResponse } from '.';

import "../styles/modal-simple.scss"

interface props {
    setCreating: React.Dispatch<React.SetStateAction<boolean>>
}


export const ModalCreateCategory = ({setCreating}: props) => {
    // GET TOKEN
    const { token, controllerCategories } = useContext(ContextDatabase);

    // CREATE FORM
    const {
        categoryName,

        onInputChange,
        formState
    } = useForm({
        categoryName: "",
    })

    // FUNC EXIT MODAL
    const exitModal = () => { setCreating(false) };

    // FUNC CALL API MODIFY PRODUCT
    const { controllerRespState, respState } = useResponseState();

    const onCreateCategoryFetch = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()

        // call API Create Category
        controllerRespState.setStatusAwait();
        axios.post(
            `https://market-product-rest.onrender.com/api/category/`,
            { category: categoryName },
            { headers: { token } }
        )
            .then(({ data }) => { 
                controllerRespState.setStatusDone();
                controllerCategories.addNewCategory(data);
                setTimeout(exitModal,300);
            })
            .catch(error => {
                controllerRespState.setStatusError("Error")
            })
    }

    return (
        <>
            <div className="modal-container">
                <div className="modal-div-top">
                    <h2 className="title-modal">Inserte la nueva categoria</h2>

                    <button className="btn-exit-modal" onClick={ exitModal }>
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>

                <form  onSubmit={onCreateCategoryFetch}>
                    <div className="modal-div-body">
                        <InputText
                            placeholder="Inserte la nueva categoria"
                            name="categoryName"
                            value={categoryName}
                            onChange={onInputChange}
                        />
                    </div>

                    <div className="modal-div-footer">
                        <input type="submit" className="btn primary" value="Crear"/>
                        <button  disabled={false} className="btn secundary" onClick={exitModal}>Rechazar</button>
                        <ItemsResponse type={respState.status} errorMsg={respState.errorMsg}/>
                    </div>
                </form>
            </div>

            <div className="black-screen" />
        </>
    )
}