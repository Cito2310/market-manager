import axios from 'axios';

import { InputText } from "../Inputs"

import { useForm } from '../../hooks/useForm';
import { useResponseState } from '../../hooks/useResponseState';

import { checkLogin } from '../../helpers/checkForm';
import { ItemsResponse } from '../ItemsResponse';

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
        const existErrorLogin = checkLogin({username, password});
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
                <div className="row sb">
                    <h2>Iniciar Sesion</h2>
                </div>

                <form  onSubmit={onLoginUser}>
                    <div className="body-container">
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

                    <div className="row gap-12 reverse">
                        <input 
                            type="submit" 
                            disabled={respState.status !== "await" ? false : true}
                            className="btn primary"
                            value="Iniciar Sesion"
                        />
                        <ItemsResponse type={respState.status} errorMsg={respState.errorMsg} />
                    </div>
                </form>
            </div>

            <div className="black-screen" />
        </>
    )
}