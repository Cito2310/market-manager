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
    typeSize: "g",
    subCategory: "",
    type: "unit",
    majorCategory: "almacen",
}
 
export const ModalCreateProduct = () => {
    const dispatch = useAppDispatch();
    const { data: dataCategory } = useAppSelector( state => state.category );

    const onExit = () => dispatch( exitModal() );
    const onSubmit = async(data: FormCreateProduct) => {
        const majorCategory = dataCategory.find(v => v.name === data.category)!.type;
        data.majorCategory = majorCategory;

        await dispatch( startCreateProduct( data ) );
        onExit();
    };

    const { register, handleSubmit, getValues, watch } = useForm<FormCreateProduct>({ defaultValues: initalFormProduct });
    const getSubcategories = useMemo(() => dataCategory.find( category => category.name === getValues().category )?.subcategories, [ watch() ])
    const getBrands = useMemo(() => getSubcategories?.find( subcategory => subcategory.name === getValues().subCategory )?.brands, [ watch() ])

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
                <InputText register={ register( "barcode", { required: true } ) } label="Codigo de barra" placeholder="Codigo de barra" className="capitalize" />

                <InputSelect
                    className="capitalize" emptyField
                    register={ register("category", { required: true }) } label="Categoria" 
                    options={ dataCategory.map( category => category.name ) }
                />

                <div className="flex w-full gap-2">
                    <InputSelect
                            className="capitalize" emptyField
                            register={ register("subCategory", { required: true }) } label="Subcategoria" 
                            options={ getSubcategories?.map( subcategory => subcategory.name ) || [] }
                    />

                    <InputSelect 
                        className="capitalize" emptyField
                        register={ register("brand", { required: true }) } label="Marca" 
                        options={ getBrands?.map( brand => brand ) || [] }
                    />
                </div>
                
                <InputText register={ register( "name", { required: true } ) } label="Nombre" placeholder="Nombre" className="capitalize" />

                <div className="flex w-full gap-2">
                    <InputNumber length={[0, 99999]} register={ register("size", { required: true }) } label="Tamaño" placeholder="Tamaño" />

                    <InputSelect 
                        register={ register("typeSize", { required: true }) } label="Unidad"
                        options={ ["kg", "g", "oz", "cm3", "l", "ml", "cc", "u"] }
                    />
                </div>

                <InputNumber length={[0, 99999]} register={ register("price", { required: true }) } label="Precio" placeholder="Precio" />

                <InputSelect
                    className="capitalize"
                    register={ register("type", { required: true }) } label="Tipo"
                    options={[ "weight", "unit" ]}
                />
            </div>
        </ModalLayout>
    )
}