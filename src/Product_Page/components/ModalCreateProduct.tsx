import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { exitModal } from "../../store/modal";
import { useAppDispatch, useAppSelector } from "../../store"
import { startCreateProduct } from "../../store/product";

import { ModalLayout } from "../../layout/ModalLayout"
import { InputText, InputNumber, InputSelect } from "../../components";

import { FormCreateProduct } from "../../../Types";

const initalFormProduct: FormCreateProduct = {
    barcode: "",
    brand: "",
    category: "",
    name: "",
    price: 0,
    size: 0,
    sizeUnit: "g",
    subcategory: "",
    type: "unit"
}
 
export const ModalCreateProduct = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector( state => state.category );

    const onExit = () => dispatch( exitModal() );
    const onSubmit = async(data: FormCreateProduct) => {
        await dispatch( startCreateProduct( data ) );
        onExit();
    };

    const { register, handleSubmit, getValues, watch } = useForm<FormCreateProduct>({ defaultValues: initalFormProduct });
    const getSubcategories = useMemo(() => data.find( category => category.name === getValues().category )?.subcategories, [ watch() ])
    const getBrands = useMemo(() => getSubcategories?.find( subcategory => subcategory.name === getValues().subcategory )?.brands, [ watch() ])

    return (
        <ModalLayout 
            title="Crear Producto"
            buttons={[
                { color: "secondary", label: "Rechazar", func: onExit },
                { color: "primary", label: "Crear", func: handleSubmit( onSubmit ) },

            ]}
            onExit={onExit}
        >
            <div className="text-txt-black flex-col flex gap-2">
                <InputText register={ register( "barcode" ) } label="Codigo de barra" placeholder="Codigo de barra" className="capitalize" />

                <InputSelect
                    className="capitalize" emptyField
                    register={ register("category") } label="Categoria" 
                    options={ data.map( category => category.name ) }
                    
                />

                <InputSelect
                    className="capitalize" emptyField
                    register={ register("subcategory") } label="Subcategoria" 
                    options={ getSubcategories?.map( subcategory => subcategory.name ) || [] }
                />

                <InputSelect 
                    className="capitalize" emptyField
                    register={ register("brand") } label="Marca" 
                    options={ getBrands?.map( brand => brand ) || [] }
                />
                
                <InputText register={ register( "name" ) } label="Nombre" placeholder="Nombre" className="capitalize" />

                <InputNumber length={[0, 99999]} register={ register("size") } label="Tamaño" placeholder="Tamaño" />

                <InputSelect 
                    register={ register("sizeUnit") } label="Unidad"
                    options={ ["kg", "g", "oz", "cm3", "l", "ml", "cc", "u"] }
                />

                <InputNumber length={[0, 99999]} register={ register("price") } label="Precio" placeholder="Precio" />

                <InputSelect
                    className="capitalize"
                    register={ register("type") } label="Tipo"
                    options={[ "weight", "unit" ]}
                />
            </div>
        </ModalLayout>
    )
}