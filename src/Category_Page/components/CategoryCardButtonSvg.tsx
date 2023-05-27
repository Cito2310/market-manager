import { Svg } from "../../components/Svg"

interface props {
    onClick?: () => void;
    element: "pen" | "plus" | "search" | "minus" | "trash";
    type?: "submit" | "button";
    className?: string;
}

export const CategoryCardButtonSvg = ({ onClick, element, type = "button", className }: props) => {
    return (
        <button 
            className={
                className 
                ? className
                : ("bg-card_btn text-card_btnText aspect-square h-7 flex justify-center items-center rounded-md transition-base hover:brightness-90")
            }
            type={ type }
            onClick={ onClick }
        >
            <Svg element={element} />
        </button>
    )
}