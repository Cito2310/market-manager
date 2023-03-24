import "./test-style.scss";
import "./btn.scss";
import "./modal.scss"
import { SvgElements } from '../components/SvgElements';
import { BtnIcon } from './BtnIcon';
import { InputNumber, InputSelect, InputText } from "./Inputs";
import { ModalExample } from './modalExample';
import { CardProduct } from "./CardProduct";
import { CardCategory } from "./CardCategory";

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

            {/* <InputText name="" value="Value VALUE" onChange={()=>{}} />
            <InputText name="" label="label LABEL Label" value="Value VALUE" onChange={()=>{}}/>
            <InputText name="" value="" placeholder="This is Placeholder PLACEHOLDER" onChange={()=>{}}/>

            <hr/>

            <InputNumber name="" value={1} onChange={()=>{}}/>
            <InputNumber name="" label="label LABEL Label" value={0} onChange={()=>{}}/>
            <InputNumber name="" value={4125} placeholder="This is Placeholder PLACEHOLDER" onChange={()=>{}} />

            <hr/>

            <InputSelect name="" value="HOLA" onChange={()=>{}} option={[
                {label: "LUNES", value: "LUNES"},
                {label: "MARTES", value: "MARTES"},
                {label: "HOLA", value: "HOLA"},
                {label: "MIERCOLES", value: "MIERCOLES"},
            ]} /> */}

            {/* <ModalExample/> */}
            {/* <CardProduct
                product={{
                    _id: "dada",
                    barcode: "41251516",
                    brand: "ARCOR",
                    category: "JUGO EN SOBRE",
                    name: "NARANJA",
                    price: 24,
                    size: 24,
                    sizeUnit: [24, "g"],
                }}
            /> */}
            <CardCategory categoryBase={{
                category: "JUGO EN SOBRE",
                brands: [
                    "ARCOR",
                    "TANG",
                    "LIGHT",
                    "LIFE",
                    "MANAO",
                    "LEPEX",
                ]
            }}/>
        </div>
    )
}