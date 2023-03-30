import { useContext, useState } from 'react';
import { BtnIcon, InputText, SvgElements } from "./"
import { ContextModal } from '../providers';
import "../styles/menu-controller-products.scss"


interface props {
    setSearch: React.Dispatch<React.SetStateAction<string>>
    search: string
}

export const MenuControllerProducts = ({setSearch, search}: props) => {
    const { setCurrentModal } = useContext(ContextModal);

    const onModalCreate = () => { setCurrentModal("create-product") }

    const [searchState, setSearchState] = useState(false);
    const onToggleSearchState = () => {setSearchState(!searchState); setSearch("")};

    const onInputChangeSearch = ({target}: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearch(target.value)
    }

    return (
        <div className="menu-controller-products">
            {
                searchState ?
                <>
                    <InputText name='search' onChange={onInputChangeSearch} value={search} autoFocus placeholder='Buscar'/>
                    <BtnIcon onClickFunc={onToggleSearchState} element="xmark"/>
                </>
                : <BtnIcon onClickFunc={onToggleSearchState} element='lens'/>
            }

            <BtnIcon onClickFunc={onModalCreate} element="plus"/>
        </div>
    )
}