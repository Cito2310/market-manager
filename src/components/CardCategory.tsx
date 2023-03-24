import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { SvgElements } from ".";
import { ContextDatabase } from '../providers';
import { IRespCategories } from '../../Types/categories';
import "../styles/card-category.scss"
import { BtnIcon } from './BtnIcon';

interface props { category: IRespCategories }

interface IBrandObject { value: string }

export const CardCategory = ({ category }:props) => {
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
            controllerCategories.modify( data );
        },

        onDecline () { setEdit(false); setBrands( initBrand ) },

        // DELETE CATEGORY
        async onDeleteCategory () {
            axios.delete(`https://market-product-rest.onrender.com/api/category/${category._id}`, {headers: {token}})
                .then(() => {
                    controllerCategories.delete(category);
                })
                .catch(error => console.log(error));
        },

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
        <div className="card-category">
            <div className="column 100w">

                <div className="row sb">
                    <h2>{category.category}</h2>

                    <div className='row gap-8'>
                        {
                            !edit ? <>
                            <BtnIcon element='pencil' onClickFunc={controllerForm.onEditFormFields}/> 
                            <BtnIcon element='trash' color='red' onClickFunc={controllerForm.onDeleteCategory}/>
                            </> :
                            <BtnIcon element='plus' onClickFunc={controllerForm.onAddFormFields}/>
                        }
                    </div>
                </div>

                <ul className="container-body">
                    {brands.map(({value}, index) => 
                            <li 
                                className={`row sb ${edit ? "input" : "text"}`}
                                key={index}
                            >
                                {
                                    edit ? <>
                                        <input type="text" value={value} name="value" onChange={event => controllerForm.onChange(index, event)} />
                                        <BtnIcon element='trash' color='red' onClickFunc={()=>controllerForm.onRemoveFormFields(index)}></BtnIcon>
                                    </> 
                                    : <p>{value}</p>
                                }
                            </li>
                    )}
                </ul>

            </div>
            
            {
                edit ?
                <div className="row reverse gap-8">
                    <button onClick={controllerForm.onSubmitEditBrands} className="btn primary">Editar</button>
                    <button className="btn secondary" onClick={controllerForm.onDecline}>Rechazar</button>
                </div>
                : null
            }
        </div>
    )
}