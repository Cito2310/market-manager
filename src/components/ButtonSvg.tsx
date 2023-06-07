import { SVGElements, Svg } from "./";

interface props {
    className: string;
    element: SVGElements;
    onClick: () => void;
}

export const ButtonSvg = ({ className, element, onClick }: props) => {
    return (
        <button
            type="button"
            onClick={ onClick }
            className={`
                transition-base hover:brightness-[.90] active:brightness-[.80] 
                flex aspect-square rounded items-center justify-center ${className}`}
        >
            <Svg element={ element } />
        </button>
    )
}