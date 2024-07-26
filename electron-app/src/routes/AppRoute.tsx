import { Route, Routes } from "react-router-dom"

import { CashRegisterPage } from "../CashRegister_Page"
import { CategoryPage } from "../Category_Page/CategoryPage"
import { ProductPage } from "../Product_Page/ProductPage"
import { LoginPage } from "../Login_Page"

import { PrivateRoute } from "./"

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