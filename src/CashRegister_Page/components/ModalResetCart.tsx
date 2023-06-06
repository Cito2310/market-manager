import { ModalLayout } from "../../layout/ModalLayout"

interface props {
    onExit : () => void;
    onResetCart : () => void;
}

export const ModalResetCart = ({ onExit, onResetCart }: props) => {
  return (
    <ModalLayout
        title="Seguro que deseas reiniciar?"
        onExit={ onExit }
        
        onSubmit={() => {
            onResetCart()
        }}
        
        buttons={[
            { color: "secondary", label: "Rechazar", func: onExit },
            { color: "danger", label: "Reiniciar", func: onResetCart },
        ]}
    >

    </ModalLayout>
  )
}