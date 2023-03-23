import "./test-style.scss";
import "./btn.scss";
import { SvgElements } from '../components/SvgElements';

export const TestStyle = () => {
    return (
        <div className="screen-test column">
            <h1>TEST STYLE</h1>

            <div className="row gap-16">
                <button className="btn primary">PRIMARY</button>
                <button className="btn white">WHITE</button>
                <button className="btn alert">ALERT</button>
                <button className="btn secondary w8">SECUNDARY</button>
                <button disabled className="btn primary">DISABLED</button>
                <button disabled className="btn loading w6"><SvgElements element="spinner"/></button>
                <button disabled className="btn done w6"><SvgElements element="done"/> Done</button>
                <button disabled className="btn error w6"><SvgElements element="xmark"/> Error</button>
            </div>

        </div>
    )
}