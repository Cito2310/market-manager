import { useAppSelector } from "../store"
import { LoginPage } from "../Login_Page/LoginPage";

interface props {
    children: JSX.Element
}

export const PrivateRoute = ({ children }: props) => {
    const token = useAppSelector( state => state.auth.token );

    if ( token === null ) return <LoginPage/>

    return children;
}