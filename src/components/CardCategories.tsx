import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { SvgElements } from "./";
import { ContextDatabase, IControllerCategories } from '../providers/Database/ProviderDatabase';
import { IRespCategories } from '../../Types/categories';
import "../styles/card-categories.scss"

interface props { category: IRespCategories }

interface IBrandObject { value: string }

export const CardCategories = ({ category }:props) => {
    const { token, controllerCategories } = useContext(ContextDatabase);
    const [edit, setEdit] = useState(false);


    // B R A N D
    const initBrand = category.brands.map( brand => ({value: brand}));
    const [brands, setBrands] = useState<IBrandObject[]>(initBrand);
   

    // C O N T R O L L E R   F O R M S
    const controllerForm = {
        // CONTROLLER FORM
        onChange (index: number, event: React.ChangeEvent<HTMLInputElement>) {
            const { value, name } = event.target;
            let copyBrands = [...brands];
            // @ts-ignore
            copyBrands[index][name] = value;
            setBrands(copyBrands)
            console.log(value, name)
        },

        async onSubmitEditBrands () {
            const transformBrand = brands.map( brand => brand.value ).filter( brand => brand );
            const { data } = await axios.put(
                "https://market-product-rest.onrender.com/api/category/brand", 
                { category: category.category, brands: transformBrand },
                {headers: {token}}
            )
            setEdit(false);
            setBrands(brands.filter( brand => brand.value ).sort());
            controllerCategories.modifyCategory( data );
        },

        onDecline () { setEdit(false); setBrands( initBrand ) },

        // CONTROLLER EDIT BRANDS
        onEditFormFields () {
            if (!brands.length) setBrands([{value: ""}]);
            setEdit(true);
        },

        onAddFormFields () { setBrands([...brands, { value: "" }]) },

        onRemoveFormFields (index: number) {
            let copyBrands = [...brands];
            copyBrands.splice(index, 1);
            setBrands(copyBrands);
        },
    }


    // R E T U R N
    return (
        <div className="card-categories">
            <div className="container-data-category">
                <div className="container-top">
                    <h1>{category.category}</h1>
                    <div>
                        {
                            !edit ? 
                            <button className='btn-icon' onClick={controllerForm.onEditFormFields}><SvgElements element="pencil"/></button> : 
                            <button className='btn-icon-plus' onClick={controllerForm.onAddFormFields}><SvgElements element="plus"/></button>
                        }
                    </div>
                </div>

                <ul className="container-body">
                    {brands.map(({value}, index) => <li key={index}>
                        {
                            edit ?
                            <>
                                <input type="text" value={value} name="value" onChange={event => controllerForm.onChange(index, event)} />
                                <button className='btn-icon' onClick={()=>controllerForm.onRemoveFormFields(index)}><SvgElements element="trash"/></button>
                            </>
                            : <p>{value}</p>
                        }
                    </li>)}
                </ul>
            </div>
            
            <div 
                className={edit ? "container-button active" : "container-button"}
            >
                <button className="btn secundary" onClick={controllerForm.onDecline}>Rechazar</button>
                <button onClick={controllerForm.onSubmitEditBrands} className="btn primary">Editar</button>
            </div>
        </div>
    )
}