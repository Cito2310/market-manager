import { useEffect } from "react"
import "./index.css"

import { useAppDispatch, useAppSelector } from "./store/store"
import { startLogin } from "./store/auth/thunks";
import { CategoryPage } from "./Category_Page/page/CategoryPage";
import { startGetCategories } from "./store/category/thunks";
import { ModalLayout } from "./layout/ModalLayout";
import { fetchApi } from "./helpers/fetchApi";
import { BottomBar } from "./components/BottomBar";
import { AppRoute } from "./routes/AppRoute";
import { useGetDatabase } from "./hooks/useGetDatabase";


export const AppMarketManager = () => {
    useGetDatabase();

    useEffect(() => {
        const callApi = () => {
            fetchApi({ method: "get", path: "api/product" }).then( data => console.log("Se llamo") )
        }

        const timer = setInterval( callApi, 120000 )
    
        return () => { clearInterval( timer ) }

    }, [])
    

    return (
        <div className="bg-gray-300 h-screen grid grid-rows-[auto_1.7em]">
            <AppRoute />

            <BottomBar />
        </div>
    )
}