import { useContext } from 'react';
import { ContextDatabase, ContextModal } from '../providers';
import "../styles/screen-categories.scss"
import { CardCategory } from '../components';
import { SvgElements } from '../components/SvgElements';

export const ScreenCategories = () => {
    const { categories } = useContext(ContextDatabase);
    const { setCurrentModal } = useContext(ContextModal);
    const onModalCreate = () => { setCurrentModal("create-category") };

    return (
        <div className="screen-categories">
            { categories.map( category => 
                <CardCategory
                    key={category._id}
                    category={category}
                />
            ) }

            <div className='menu-controller'>
                <button onClick={ onModalCreate }><SvgElements element='plus'/></button>
            </div>
        </div>
    )
}