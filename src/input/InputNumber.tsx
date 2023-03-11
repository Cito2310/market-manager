import "./input-style.scss"

interface props {
    label: string
    placeholder: number
    length?: { min?: number, max?: number }
    defaultValue?: number
    name: string
    value: string
    onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputNumber = ({ label, placeholder, length, defaultValue, value, name, onChange }: props) => {
    return (
        <div className="input-container">
            <label>{label}</label>
            <input 
                defaultValue={defaultValue}
                type="number"
                placeholder={String(placeholder)}
                max={length?.max}
                min={length?.min}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}