import { IProductFormat } from '../../../Types/product';

export interface InterfaceModalAction { type: TypeModalTypes, payload?: unknown }

type TypeModalTypes =   "Change modal-create-product"
                        | "Change modal-modify-product"
                        | "Change modal-delete-product"
                        | "Change modal-none"

export interface InterfaceContextModal {
    currentModal: "none" | "delete" | "modify" | "create",
    productSelected: IProductFormat,
    dispatchModal: React.Dispatch<InterfaceModalAction>
}