export interface ButtonProps {
    label: string,
    func?: () => void,
    color: "danger" | "primary" | "secondary",
    type?: "submit" | "button",
    full?: boolean,
    disabled?: boolean,
}

export const Button = ({ color, func, label, type = "button", full, disabled }: ButtonProps) => {
    return (
        <button disabled={disabled} className={`
            rounded-md p-1 px-3 transition-base w-[100px] hover:brightness-[.90] active:brightness-[.80] disabled:brightness-75
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