import "./input-style.scss"

interface props {
    label: string
    name: string
    placeholder: string
    value: string
    onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputText = ({ label, placeholder, name, value, onChange }: props) => {
    return (
        <div className="input-container">
            <label>{label}</label>
            <input 
                name={name}
                placeholder={placeholder}
                type="text"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}