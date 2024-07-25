export interface ButtonProps {
    label: string,
    func?: () => void,
    color: "danger" | "primary" | "secondary",
    type?: "submit" | "button",
    full?: boolean,
}

export const Button = ({ color, func, label, type = "button", full }: ButtonProps) => {
    return (
        <button className={`
            rounded-md p-1 px-3 transition-base w-[100px] hover:brightness-[.90] active:brightness-[.80]
            ${ color === "danger" && "bg-btn_danger text-white" }
            ${ color === "primary" && "bg-btn_primary text-white" }
            ${ color === "secondary" && "bg-btn_secondary text-black" }
            ${ full && "w-full" }
        `}
        type={ type }
        onClick={ func }
        >
            { label }
        </button> 
    )
}