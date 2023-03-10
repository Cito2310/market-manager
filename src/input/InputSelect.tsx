import "./input-style.scss"

interface props {
    label: string
}

export const InputSelect = ({ label }: props) => {
    return (
        <div className="input-container">
            <label>{label}</label>
            <select>
                <option>option 1</option>
                <option>option 2</option>
                <option>option 3</option>
            </select>
        </div>
    )
}