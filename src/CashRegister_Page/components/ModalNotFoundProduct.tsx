import { useEffect } from "react"
import { ModalLayout } from "../../layout/ModalLayout"
import { useAppDispatch } from "../../store/store"
import { exitModal } from "../../store/modal/modalSlice"

export const ModalNotFoundProduct = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
      setTimeout(()=>{ 
        dispatch( exitModal() ) 
    },600)
    
    }, [])
    

    return (
        <ModalLayout title="Producto no encontrado">
        </ModalLayout>
    )
}