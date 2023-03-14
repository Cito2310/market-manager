import { InterfaceContextModal, InterfaceModalAction } from './typesReducerModal';

export const reducerMordal = ( initalState: InterfaceContextModal, action: InterfaceModalAction ): InterfaceContextModal => {
    switch ( action.type ) {
        case "Change modal-create-product": return {...initalState, currentModal: "create" }
        case "Change modal-delete-product": return {...initalState, currentModal: "delete" }
        case "Change modal-modify-product": return {...initalState, currentModal: "modify" }
        case "Change modal-none":           return {...initalState, currentModal: "none" }
    
        default: return initalState;
    }
}