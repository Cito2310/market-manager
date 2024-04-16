import { useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Quagga from "quagga";

const config = {
    "inputStream": {
      "type": "LiveStream",
      "constraints": {
        "width": { "min": 450 },
        "height": { "min": 300 },
        "facingMode": "environment",
        "aspectRatio": { "min": 1, "max": 2 }
      }
    },
    "locator": {
      "patchSize": "medium",
      "halfSample": true
    },
    "numOfWorkers": 2,
    "frequency": 10,
    "decoder": {
      "readers": ["ean_reader"]
    },
    "locate": true
};  

interface Props {
    onDetected: (code: string) => void;
}

export const Scanner = ({ onDetected }: Props) => {
    useEffect(() => {
        Quagga.init(config, (err: unknown) => {
            if (err) {
                console.log(err, "error msg");
            }
            Quagga.start();
            return () => { Quagga.stop() };
        });

        Quagga.onDetected(detected);

        return () => { Quagga.stop(); console.log("Chao") }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const detected = (result : any) => {
        onDetected(result.codeResult.code);
    };

    return (
        <div id="interactive" className="viewport" />
    );
};