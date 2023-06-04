import { Navigate } from "react-router-dom"
import { useAppSelector } from "../store/store"
import { LoginPage } from "../Login_Page/page/LoginPage";

interface props {
    children: JSX.Element
}

export const PrivateRoute = ({ children }: props) => {
    const token = useAppSelector( state => state.auth.token );

    if ( token === null ) return <LoginPage/>

    return children;
}