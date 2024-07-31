import { useAppSelector } from "./store"
import { BottomBar, PrintTicket } from "./components";
import { AppRoute } from "./routes";
import { useGetDatabase } from "./hooks";
import "./index.css"
import { PrintPrice } from "./components/PrintPrice";

export const AppMarketManager = () => {
    const { isActive: isActivePrintTicket } = useAppSelector( state => state.print );
    const { isActive: isActivePrintPrice } = useAppSelector( state => state.printPrice );
    const { isLoading, isOnline } = useAppSelector( state => state.product.status );
    useGetDatabase();

    if ( isActivePrintTicket ) return <PrintTicket />;

    return (
        <>
            { isActivePrintPrice && <PrintPrice /> }

            <div className={`bg-gray-300 h-screen grid grid-rows-[auto_1.7em] ${isActivePrintPrice && "hidden"}`}>
                <AppRoute />

                <BottomBar 
                    isLoading={ isLoading } 
                    isOnline={ isOnline }
                />
            </div>
        </>
    )
}