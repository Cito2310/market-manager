import axios from 'axios';
import { useContext } from 'react';

import { useForm } from '../../hooks/useForm';
import { useResponseState } from '../../hooks/useResponseState';

import { ContextModal, ContextDatabase } from '../../providers';

import { ItemsResponse } from '../';
import { InputText } from '../Inputs';

import { SvgElements } from '../SvgElements';

export const ModalCreateCategory = () => {
    // GET TOKEN
    const { token, controllerCategories } = useContext(ContextDatabase);

    const { exitModal } = useContext(ContextModal);

    // CREATE FORM
    const {
        categoryName,
        onInputChange,
    } = useForm({
        categoryName: "",
    })

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
                controllerCategories.add(data);
                setTimeout(exitModal,300);
            })
            .catch(error => {
                controllerRespState.setStatusError("Error")
            })
    }

    return (
        <>
            <div className="modal-container">
                <div className="row sb">
                    <h2>Inserte la nueva categoria</h2>

                    <button className="btn-exit" onClick={exitModal}><SvgElements element="xmark"/></button>
                </div>

                <form  onSubmit={onCreateCategoryFetch}>
                    <div className="body-container">
                        <InputText
                            placeholder="Inserte la nueva categoria"
                            name="categoryName"
                            value={categoryName}
                            onChange={onInputChange}
                        />
                    </div>

                    <div className="row gap-12 reverse">
                        <input type="submit" className="btn primary" value="Crear"/>
                        <button disabled={respState.status === "await" ? false : true} className="btn secundary" onClick={exitModal}>Rechazar</button>
                        <ItemsResponse type={respState.status} errorMsg={respState.errorMsg}/>
                    </div>
                </form>
            </div>

            <div className="black-screen" />
        </>
    )
}