import "../styles/inputs.scss"


// I N P U T   T E X T
interface propsText {
    autoFocus?: boolean
    label?: string
    name: string
    onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
    password?: boolean
    placeholder?: string
    value: string
}

export const InputText = ({ label, placeholder, name, value, onChange, autoFocus, password }: propsText) => (
    <div className="input-container text">
        { label ? <label>{label}</label> : null }

        <input 
            autoFocus={autoFocus}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            type={password ? "password" : "text"}
            value={value}
        />
    </div>
)


// I N P U T   N U M B E R
interface propsNumber {
    autoFocus?: boolean
    label?: string
    length?: { min?: number, max?: number }
    name: string
    onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    value: number
}

export const InputNumber = ({ label, placeholder, length, value, name, onChange, autoFocus }: propsNumber) => {
    return (
        <div className="input-container number">
            { label ? <label>{label}</label> : null }

            <input 
                autoFocus={autoFocus}
                max={length?.max}
                min={length?.min}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                type="number"
                value={value}
            />
        </div>
    )
}


// I N P U T   S E L E C T 
interface propsSelect {
    label?: string
    option: {label: string, value: string}[]
    name: string
    value: string
    onChange: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void
}

export const InputSelect = ({ label, option, name, value, onChange }: propsSelect) => {
    return (
        <div className="input-container select">
            { label ? <label>{label}</label> : null }

            <select name={name} value={value} onChange={onChange}>
                { option.map(( { label, value }, index )=> 
                    <option key={index+"option"+value} value={value}>
                        {label}
                    </option>
                )}
            </select>
        </div>
    )
}