import "./input-style.scss"

interface props {
    label: string
    option: option[]
    name: string
    value: string
    onChange: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void
}

interface option {
    label: string
    value: string
}

export const InputSelect = ({ label, option, name, value, onChange }: props) => {
    return (
        <div className="input-container">
            <label>{label}</label>
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