import { FormCategory } from "../../../Types";
import { deleteCategoryById, initLoading, setCategories, stopLoading, updateCategory, createCategory } from "./categorySlice";
import { fetchApi, formCategoryToCategory } from "../../helpers";
import { AppDispatch, RootState } from "../store";

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
        const parseData = formCategoryToCategory( dataForm );

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

export const startCreateCategory = (dataForm: { name: string }) => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        
        dispatch( initLoading() );
        const { token } = getState().auth;

        const data = await fetchApi({
            method: "post",
            path: `api/category`,
            token: token!,
            body: dataForm
        })

        dispatch( createCategory( data ) );
        dispatch( stopLoading() );

    };
};

// TODO: startCreateCategory