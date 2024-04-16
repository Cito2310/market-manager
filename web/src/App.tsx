import { useState } from "react";
import { Scanner } from "./components/Scanner";


export function App() {
    const [cameraActivated, setCameraActivated] = useState(false);
    const [result, setResult] = useState<null | string>(null);

    const onDetected = ( result: string ) => setResult(result);
    const toggleCamera = () => setCameraActivated( !cameraActivated );


    return (
        <div className="App">
            <p>{result ? result : "Necesita Escanear"}</p>
            <button onClick={toggleCamera}>
                {cameraActivated ? "Parar escaneo" : "Iniciar escaneo"}
            </button>
            <div className="container">
                {cameraActivated && <Scanner onDetected={onDetected} />}
            </div>
        </div>
    );
}