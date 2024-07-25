import { Svg, SVGElements } from './Svg';

interface props {
    buttons: {
        element: SVGElements;
        onClick: () => void;
    }[]
}

export const TopButtons = ({ buttons }: props) => {
    return (
        <div className="fixed top-3 left-3 flex gap-3">
            {
                buttons.map(({ element, onClick }, index) => 
                    <button key={ index } onClick={ onClick } className="
                        w-12 text-xl rounded-full aspect-square bg-gray-500 text-white 
                        flex opacity-80 hover:opacity-100 transition-base"
                    >
                        <Svg classname="m-auto" element={ element } />
                    </button>
                )
            }
        </div>
    )
}