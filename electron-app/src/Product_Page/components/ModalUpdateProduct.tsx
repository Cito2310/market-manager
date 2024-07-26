import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../store";
import { startUpdateProductByBarcode, startCreateProduct } from "../../store/product";
import { exitModal } from "../../store/modal";

import { ModalLayout } from "../../layout/ModalLayout";
import { InputText, InputNumber, InputSelect } from "../../components";

import { FormUpdateProduct } from "../../../Types";

export const ModalUpdateProduct = () => {
    const dispatch = useAppDispatch();
    const { selectedProduct } = useAppSelector( state => state.modal );
    const { data: dataCategory } = useAppSelector( state => state.category );
    const [countSubmit, setCountSubmit] = useState(0);

    const initialFormProduct: FormUpdateProduct = {
        brand: selectedProduct!.brand,
        category: selectedProduct!.category,
        name: selectedProduct!.name,
        price: selectedProduct!.price,
        size: selectedProduct!.size,
        typeSize: selectedProduct!.typeSize,
        subCategory: selectedProduct!.subCategory,
        type: selectedProduct!.type,
        majorCategory: selectedProduct!.majorCategory
    }

    const onExit = () => dispatch( exitModal() );
    const onSubmit = async(data: FormUpdateProduct) => {
        const majorCategory = dataCategory.find(v => v.name === data.category)!.type;
        data.majorCategory = majorCategory;

        await dispatch( startUpdateProductByBarcode( selectedProduct!.barcode, data ) );

        setCountSubmit(countSubmit + 1)

        onExit();
    };
    

    const { register, handleSubmit, getValues, watch } = useForm<FormUpdateProduct>({ defaultValues: initialFormProduct });
    const getSubcategories = useMemo(() => dataCategory.find( category => category.name === getValues().category )?.subcategories, [ watch() ])
    const getBrands = useMemo(() => getSubcategories?.find( subcategory => subcategory.name === getValues().subCategory )?.brands, [ watch() ])

    return (
        <ModalLayout 
            title="Editar Producto"
            buttons={[
                { color: "secondary", label: "Rechazar", func: onExit },
                { color: "primary", label: "Editar", func: handleSubmit( onSubmit ) },

            ]}
            onExit={onExit}
        >
            <div className="text-txt-black flex-col flex gap-2">
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

                <InputNumber length={[0, 99999]} register={ register("size", { required: true }) } label="Tamaño" placeholder="Tamaño" />

                <InputSelect 
                    register={ register("typeSize", { required: true }) } label="Unidad"
                    options={ ["kg", "g", "oz", "cm3", "l", "ml", "cc", "u"] }
                />

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