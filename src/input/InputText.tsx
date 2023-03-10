import "./input-style.scss"

interface props {
    label: string
    placeholder: string
}

export const InputText = ({ label, placeholder }: props) => {
    return (
        <div className="input-container">
            <label>{label}</label>
            <input 
                type="text"
                placeholder={placeholder}
            />
        </div>
    )
}