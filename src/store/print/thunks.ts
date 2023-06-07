import { Ticket } from "../../../Types";
import { AppDispatch, RootState } from "../store";
import { exitToPrint } from "./printSlice";

export const startPrintTicket = ( ticket: Ticket ) => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        
            await window.electronAPI.printPage();
            // @ts-ignore
            await window.electronAPI.saveTicket( ticket );
            setTimeout( () => dispatch( exitToPrint() ), 1000 );

    };
};