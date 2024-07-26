import { setModalProduct } from "../store/modal";
import { useAppDispatch, useAppSelector } from "../store";
import { TopButtons } from "../components";
import { ModalCreateProduct, ModalDeleteProduct, ModalUpdateProduct, CardProduct } from "./components";
import { ProductInType } from "../../Types";

export const ProductPage = () => {
    const { products } = useAppSelector( state => state.product );
    const { current } = useAppSelector( state => state.modal );
    const dispatch = useAppDispatch();

    const onSetModalCreateProduct = () =>  dispatch( setModalProduct( "createProduct" ) );

    return (
        <div className="flex flex-wrap gap-5 p-5">

            <TopButtons
                buttons={[
                    {element: "plus", onClick: onSetModalCreateProduct},
                ]}
            />
            { products
            .reduce((prev, curr): ProductInType[]=>{
                let copyPrev = structuredClone(prev);
                const existType = copyPrev.find(v => v.name === curr.majorCategory)
                const existIndex = copyPrev.findIndex(v => v.name === curr.majorCategory)

                if (existType) { copyPrev[existIndex].products.push(curr) }
                if (!existType) { copyPrev.push({ name: curr.majorCategory, products: [ curr ] }) }

                return copyPrev;


            }, [] as ProductInType[] )
            .map( majorCategory => 
                <section key={majorCategory.name} className="">
                    <h2 className="uppercase font-Montserrat font-bold text-[1.8em] ml-1" >{majorCategory.name}</h2>
                    <div className="flex flex-wrap gap-5">
                        {majorCategory.products.map( product => <CardProduct key={ product.barcode } product={ product } /> )}
                    </div>
                </section>
            )
            }
            

            { current === "createProduct" && <ModalCreateProduct/> }
            { current === "updateProduct" && <ModalUpdateProduct/> }
            { current === "deleteProduct" && <ModalDeleteProduct/> }
        </div>
    )
}