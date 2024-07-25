import { useAppSelector } from "./store"
import { BottomBar, PrintTicket } from "./components";
import { AppRoute } from "./routes";
import { useGetDatabase } from "./hooks";
import "./index.css"

export const AppMarketManager = () => {
    const { isActive } = useAppSelector( state => state.print );
    const { isLoading, isOnline } = useAppSelector( state => state.product.status );
    useGetDatabase();

    if ( isActive ) return <PrintTicket />;

    return (
        <div className="bg-gray-300 h-screen grid grid-rows-[auto_1.7em]">
            <AppRoute />

            <BottomBar 
                isLoading={ isLoading } 
                isOnline={ isOnline }
            />
        </div>
    )
}