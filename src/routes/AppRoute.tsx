import { Route, Routes } from "react-router-dom"
import { CashRegisterPage } from "../CashRegister_Page/page/CashRegisterPage"
import { CategoryPage } from "../Category_Page/page/CategoryPage"
import { ProductPage } from "../Product_Page/page/ProductPage"
import { PrivateRoute } from "./PrivateRoute"
import { LoginPage } from "../Login_Page/page/LoginPage"

export const AppRoute = () => {
    return (
        <div className="h-full overflow-auto">
            <Routes>
                <Route path="/" element={ <CashRegisterPage /> } />

                <Route path="/products" element={ 
                    <PrivateRoute>
                        <ProductPage />
                    </PrivateRoute>
                } />

                <Route path="/categories" element={                     
                    <PrivateRoute>
                        <CategoryPage />
                    </PrivateRoute>
                } />

                <Route path="/login" element={ <LoginPage /> } />
            </Routes>
        </div>
    )
}