import { useContext } from 'react';
import { ContextDatabase } from '../providers/ProviderDatabase';
import { ModalLoginProduct } from '../components/modals';

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