import { Product, Ticket } from "../../../Types";
import { AppDispatch, RootState } from "../store";
import { exitToPrint, setProductPrice } from "./printPriceSlice";

export const startPrintPrice = () => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
            await window.electronAPI.printPage();
            setTimeout( () => dispatch( exitToPrint() ), 1000 );

    };
};