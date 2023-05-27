import { FormCategory } from '../../Category_Page/components/CategoryCard';
import { fetchApi } from "../../helpers/fetchApi";
import { AppDispatch, RootState } from "../store";
import { deleteCategoryById, initLoading, setCategories, stopLoading, updateCategory } from "./categorySlice";

export const startGetCategories = () => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        
        const { token } = getState().auth;

        const data = await fetchApi({
            method: "get",
            path: "api/category",
            token: token!
        })

        dispatch( setCategories( data ) );

    };
};

export const startUpdateCategoryById = ( id: string, dataForm: FormCategory ) => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        
        dispatch( initLoading() );

        const { token } = getState().auth;

        const parseData = {
            category: dataForm.category,
            brands: dataForm.brands.map(({ brand }) => brand )
        }

        const data = await fetchApi({
            method: "put",
            path: `api/category/${ id }`,
            token: token!,
            body: parseData,
        })

        dispatch( stopLoading() );
        dispatch( updateCategory( data ) );
    };
};

export const startDeleteCategoryById = ( id:string ) => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        
        dispatch( initLoading() );

        const { token } = getState().auth;

        await fetchApi({
            method: "delete",
            path: `api/category/${ id }`,
            token: token!,
        });

        dispatch( stopLoading() );
        dispatch( deleteCategoryById( id ) );

    };
};

// TODO: startCreateCategory