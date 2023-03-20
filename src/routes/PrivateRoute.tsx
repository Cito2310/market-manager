import { useContext } from 'react';
import { ContextDatabase } from '../providers/Database/ProviderDatabase';
import { ModalLoginProduct } from '../components';

interface props {
    children: JSX.Element | JSX.Element[]
}

export const PrivateRoute = ({ children }: props) => {
    const { setToken, token } = useContext(ContextDatabase);

    return (
        <>
            {
                !token ? <ModalLoginProduct setLoginToken={ setToken }/> :
                children   
            }
        </>
    )
}