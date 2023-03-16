import axios from 'axios';

import { InputText, ItemsResponse } from "./"

import { useForm } from '../hooks/useForm';
import { useResponseState } from '../hooks/useResponseState';

import { checkErrorLogin } from '../helpers/checkErrorLogin';

import "../styles/modal-simple.scss"

interface props {
    setLoginToken: React.Dispatch<React.SetStateAction<string>>
}

export const ModalLoginProduct = ({ setLoginToken }: props) => {
    // STATE ERROR
    const { controllerRespState, respState } = useResponseState();

    // USEFORM USERNAME AND PASSWORD
    const {
        username,
        password,

        onInputChange,
    } = useForm({
        username: "",
        password: "",
    })
 
    // FUNC LOGIN USER
    const onLoginUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Check error offline
        const existErrorLogin = checkErrorLogin({username, password});
        if ( existErrorLogin ) { controllerRespState.setStatusError(existErrorLogin); return}

        // call API Login
        controllerRespState.setStatusAwait()
        axios.post(
            "https://market-product-rest.onrender.com/api/user/login", 
            { username, password }
        )
        .then( resp => { 
            controllerRespState.setStatusDone()
            interface IRespData { token: string };
            const { token } : IRespData = resp.data;
            setLoginToken( token );
        })
        .catch( error => {
            controllerRespState.setStatusError("Datos invalidos")
        })
    }

    return (
        <>
            <div className="modal-container">
                <div className="modal-div-top">
                    <h2 className="title-modal">Iniciar Sesion</h2>
                </div>

                <form  onSubmit={onLoginUser}>
                <div className="modal-div-body">
                    <InputText
                        label="Nombre de usuario"
                        name="username"
                        onChange={onInputChange}
                        placeholder="Inserte el nombre de usuario"
                        value={username}
                    />

                    <InputText
                        label="Contraseña"
                        name="password"
                        onChange={onInputChange}
                        password
                        placeholder="Inserte la contraseña"
                        value={password}
                    />
                </div>

                <div className="modal-div-footer">
                    <input type="submit" className="btn-modal primary" value="Iniciar Sesion"/>
                    
                    <ItemsResponse type={respState.status} errorMsg={respState.errorMsg} />
                </div>
                </form>
            </div>

            <div className="black-screen" />
        </>
    )
}