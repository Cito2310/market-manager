import "./input-style.scss"

interface props {
    label: string
    placeholder: number
    length?: { min?: number, max?: number }
    defaultValue?: number
}

export const InputNumber = ({ label, placeholder, length, defaultValue }: props) => {
    return (
        <div className="input-container">
            <label>{label}</label>
            <input 
                defaultValue={defaultValue}
                type="number"
                placeholder={String(placeholder)}
                max={length?.max}
                min={length?.min}
            />
        </div>
    )
}