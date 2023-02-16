import { IProduct } from '../backup/src/interfaces/IProduct';

declare global {
    interface Window {
        electronAPI: {
            saveDataProduct: ( token: string ) => IProduct[],
        }
    }
}