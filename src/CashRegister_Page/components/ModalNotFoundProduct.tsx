import { useEffect } from "react"
import { useAppDispatch } from "../../store"
import { exitModal } from "../../store/modal"
import { ModalLayout } from "../../layout/ModalLayout"

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