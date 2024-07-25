import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../store";
import { startUpdateProductByBarcode } from "../../store/product";
import { exitModal } from "../../store/modal";

import { ModalLayout } from "../../layout/ModalLayout";
import { InputText, InputNumber, InputSelect } from "../../components";

import { FormUpdateProduct } from "../../../Types";

export const ModalUpdateProduct = () => {
    const dispatch = useAppDispatch();
    const { selectedProduct } = useAppSelector( state => state.modal );
    const { data } = useAppSelector( state => state.category );

    const initialFormProduct: FormUpdateProduct = {
        brand: selectedProduct!.brand,
        category: selectedProduct!.category,
        name: selectedProduct!.name,
        price: selectedProduct!.price,
        size: selectedProduct!.size,
        sizeUnit: selectedProduct!.sizeUnit,
        subcategory: selectedProduct!.subcategory,
        type: selectedProduct!.type,
    }

    const onExit = () => dispatch( exitModal() );
    const onSubmit = async(data: FormUpdateProduct) => {
        await dispatch( startUpdateProductByBarcode( selectedProduct!.barcode, data ) );
        onExit();
    };

    const { register, handleSubmit, getValues, watch } = useForm<FormUpdateProduct>({ defaultValues: initialFormProduct });
    const getSubcategories = useMemo(() => data.find( category => category.name === getValues().category )?.subcategories, [ watch() ])
    const getBrands = useMemo(() => getSubcategories?.find( subcategory => subcategory.name === getValues().subcategory )?.brands, [ watch() ])

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