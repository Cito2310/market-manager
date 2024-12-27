import { ModalCreateProduct, ModalDeleteProduct, ModalUpdateProduct, CardProduct } from "./components";
import { getProductInType } from "./helpers/getProductInType";
import { TopButtonProduct } from "./components/TopButtonProduct";
import { useProduct } from "./hooks/useProduct";

export const ProductPage = () => {
    const { modal, products, search } = useProduct();

    return (
        <div className="flex flex-wrap gap-5 p-5">
            <TopButtonProduct 
                onSearch={search.onSearch} 
                onSetModalCreateProduct={modal.onSetModalCreateProduct} 
                registerReturn={search.register("search")}
            />

            { getProductInType( products ).map( majorCategory => 
                <section key={majorCategory.name} className="">
                    <h2 className="uppercase font-Montserrat font-bold text-[1.8em] ml-1" >{majorCategory.name}</h2>
                    <div className="flex flex-wrap gap-5">
                        {majorCategory.products.map( product => <CardProduct key={ product.barcode } product={ product } /> )}
                    </div>
                </section>
            )}

            { modal.current === "createProduct" && <ModalCreateProduct/> }
            { modal.current === "updateProduct" && <ModalUpdateProduct/> }
            { modal.current === "deleteProduct" && <ModalDeleteProduct/> }
        </div>
    )
}