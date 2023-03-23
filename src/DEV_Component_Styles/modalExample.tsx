import { SvgElements } from '../components/SvgElements';

export const ModalExample = () => {

    // RETURN
    return (
        <div className="modal-container">
            <div className="row sb">
                <h2>Modal Base</h2>
                <button className="btn-exit"><SvgElements element="xmark"/></button>
            </div>

            <div className="body-container">
                <p>Seguro que deseas eliminar este producto?</p>
                <p>Muy seguro?</p>
            </div>

            <div className="row gap-12 reverse">
                <button className="btn primary">Enviar</button>
                <button className="btn secondary">Rechazar</button>
            </div>
        </div>
    )
}