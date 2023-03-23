import "./test-style.scss";
import "./btn.scss";
import { SvgElements } from '../components/SvgElements';
import { BtnIcon } from './BtnIcon';

export const TestStyle = () => {
    // const button = () => {console.log(event.target)} 

    return (
        <div className="screen-test column">
            <h1>TEST STYLE</h1>

            {/* <div className="row gap-16">
                <button className="btn primary">PRIMARY</button>
                <button className="btn white">WHITE</button>
                <button className="btn alert">ALERT</button>
                <button className="btn secondary w8">SECUNDARY</button>
                <button disabled className="btn primary">DISABLED</button>
                <button disabled className="btn loading w6"><SvgElements element="spinner"/></button>
                <button disabled className="btn done w6"><SvgElements element="done"/> Done</button>
                <button disabled className="btn error w6"><SvgElements element="xmark"/> Error</button>
            </div> */}

            {/* <div className="row gap-16">
                <button onClick={button}></button>
                <BtnIcon onClickFunc={button} element="done"/>
                <BtnIcon element="done"/>
                <BtnIcon element="lens"/>
                <BtnIcon element="pencil"/>
                <BtnIcon element="plus" color="green"/>
                <BtnIcon element="print"/>
                <BtnIcon element="spinner"/>
                <BtnIcon element="trash" color="red"/>
                <BtnIcon element="xmark"/>
            </div> */}

        </div>
    )
}