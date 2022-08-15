import { Amplify } from "aws-amplify";
import { useState, useEffect, useRefs } from "react";
import Webcam from "react-webcam";
import Predictions, {
    AmazonAIPredictionsProvider,
} from "@aws-amplify/predictions";

export default () => {
    const containerRef = useRef(null);
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        Predictions.removePluggable("AmazonAIPredictionsProvider");
        Amplify.addPluggable(new AmazonAIPredictionsProvider());
    }, []);

    async function validate() {
        const imageBase64String = webcamRef.current.getScreenshot();
        setImage(imageBase64String);
        const base64Image = imageBase64String.split(";base64,").pop();
        const imageBuffer = Buffer.from(base64Image, "base64");
        try {
            const { entities } = await Predictions.identify({
                entities: {
                    source: {
                        bytes: imageBuffer,
                    },
                },
            });
            if (entities.length === 0) {
                alert("no face detected");
                setImage(null);
                setImage(null);
            } else {
                alert("face detected");
            }
        } catch (error) {
            console.log({ error });
        }
    }

    return (
        <main ref={containerRef} className="w-[512px] mx-auto">
            <div className="relative mx-auto w-[512px] h-[512px] aspect-square bg-black">
                <p
                    className={`text-white absolute inset-x-0 top-1/2 text-center ${
                        image === null ? "block" : "hidden"
                    }`}
                >
                    Loading...
                </p>
                <Webcam
                    className={`absolute z-10 inset-0 h-full w-full ${
                        image === null ? "block" : "hidden"
                    }`}
                    muted
                    mirrored
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                        facingMode: "selfie",
                        aspectRatio: 1 / 1,
                    }}
                ></Webcam>
                <img
                    className={` absolute ${
                        image !== null ? "block" : "hidden"
                    }`}
                    layout="fill"
                    src={image}
                ></img>
            </div>
            <div className="flex gap-4 p-4">
                <button
                    className="bg-black text-white rounded px-4 py-2"
                    onClick={() => setImage(null)}
                >
                    Try Again
                </button>

                <button
                    onClick={validate}
                    className="bg-black text-white rounded px-4 py-2"
                >
                    Validate
                </button>
            </div>
        </main>
    );
};
