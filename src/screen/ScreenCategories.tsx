import { useContext, useState } from 'react';
import { ContextDatabase } from '../providers/Database/ProviderDatabase';
import "../styles/screen-categories.scss"
import { CardCategories } from '../components/CardCategories';
import { SvgElements } from '../components/SvgElements';
import { ModalCreateCategory } from '../components/ModalCreateCategory';

export const ScreenCategories = () => {
    const { categories } = useContext(ContextDatabase);
    const [creating, setCreating] = useState(false);

    const onModalCreate = () => { setCreating(true) }

    return (
        <>
            <div className="screen-categories">
                { categories.map( (category, index) => 
                    <CardCategories
                        key={category.category+index}
                        category={category}
                    />
                ) }

                <div className='menu-controller'>
                    <button onClick={ onModalCreate }><SvgElements element='plus'/></button>
                </div>
            </div>

            { creating ? <ModalCreateCategory setCreating={setCreating}/> : null }
        </>
    )
}