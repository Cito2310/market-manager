import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/store";
import { startGetCategories } from "../store/category/thunks";
import { startGetProducts } from "../store/product/thunks";

export const useGetDatabase = () => {
    const { auth, category, product } = useAppSelector( state => state );
    const token = auth.token;

    const dispatch = useAppDispatch();

    useEffect(() => {
        if ( !product.status.isCalled ) { 
            dispatch( startGetProducts() );
        };

        if ( token !== null ) { dispatch( startGetCategories() ) };
        
    }, [token])
    
}