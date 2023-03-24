import { IRespCategories } from '../../Types/categories';
import { BtnIcon } from './BtnIcon';

import "./card-category.scss"

interface props {
    categoryBase: IRespCategories
}

export const CardCategory = ({ categoryBase }: props) => {
    const {brands, category } = categoryBase;

    return (
        <div className="card-category">
            <div className='column'>

                <div className='row sb'>
                    <h2>{category}</h2>
                    <BtnIcon element="pencil"/>
                </div>

                <ul className='column'>
                        { brands.map( brand => <li className='row sb input'>
                            <input/>
                            <BtnIcon color='red' element="trash"/>
                        </li>)}
                </ul>

            </div>

            <div className='row reverse gap-8'>
                <button className='btn primary'>Enviar</button>
                <button className='btn secondary'>Rechazar</button>
            </div>
        </div>
    )
}