import { BlackScreen } from "../components/BlackScreen"
import { Button, ButtonProps } from "../components/Button"
import { Svg } from "../components/Svg"

interface props {
    buttons?: ButtonProps[],
    children?: JSX.Element | JSX.Element[],
    onExit?: () => void,
    onSubmit?: ( event: React.FormEvent<HTMLFormElement> ) => void,
    title: string,
    hasError?: boolean,
    msgError?: string,
}

export const ModalLayout = ({
    children,
    title,
    buttons,
    onExit,
    onSubmit,
    hasError,
    msgError

}: props) => {
    return (
        <>
            <div className="
                bg-card_bg fixed top-12 z-20 p-3 rounded-md left-[50%] translate-x-[-50%]
                w-[32em] flex flex-col
            ">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">{ title }</h1>
                    {
                        onExit &&
                        <button onClick={ onExit } className="text-2xl text-gray-400 transition-base hover:brightness-75">
                            <Svg element="xmark"/>
                        </button>
                    }
                </div>
                <form onSubmit={ onSubmit }>

                    { children }

                    <div className="mt-3">
                        <div className="flex gap-3 justify-end">
                            {
                                buttons?.map( (buttonProps, index) => <Button key={index} {...buttonProps} /> )
                            }
                        </div>
                        {hasError && <p className="text-red-600">Hubo un error !{msgError && ` - ${msgError}`}</p>} 
                    </div>

                </form>
            </div>

            <BlackScreen onClick={ onExit } />
        </>
    )
}