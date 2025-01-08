import { useEffect } from "react"
import { useAppDispatch } from "../../store"
import { exitModal } from "../../store/modal"
import { ModalLayout } from "../../layout/ModalLayout"
import { useSound } from "../../hooks/internal/useSound"

export const ModalNotFoundProduct = () => {
    const dispatch = useAppDispatch();

    // SECCION DE CODIGO
    // Ejecuta un codigo cuando hay un error al detectar un producto
    const play = useSound("error");
    useEffect(() => { play() }, [])
    

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