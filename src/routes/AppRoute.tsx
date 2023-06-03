import { Route, Routes } from "react-router-dom"
import { CashRegisterPage } from "../CashRegister_Page/page/CashRegisterPage"
import { CategoryPage } from "../Category_Page/page/CategoryPage"
import { ProductPage } from "../Product_Page/page/ProductPage"

export const AppRoute = () => {
    return (
        <div className="h-full overflow-auto">
            <Routes>
                <Route path="/" element={ <CashRegisterPage /> } />

                <Route path="/products" element={ <ProductPage /> } />

                <Route path="/categories" element={ <CategoryPage /> } />
            </Routes>
        </div>
    )
}