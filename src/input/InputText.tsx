import "./input-style.scss"

interface props {
    label: string
    name: string
    placeholder: string
    value: string
    onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
    autoFocus?: boolean
    password?: boolean
}

export const InputText = ({ label, placeholder, name, value, onChange, autoFocus, password }: props) => {
    return (
        <div className="input-container">
            <label>{label}</label>
            <input 
                name={name}
                placeholder={placeholder}
                type={password ? "password" : "text"}
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
            />
        </div>
    )
}