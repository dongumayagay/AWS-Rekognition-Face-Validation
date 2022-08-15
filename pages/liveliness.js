import { Predictions, Auth } from "aws-amplify";
import { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import AWS from "aws-sdk";
import awsConfig from "../src/aws-exports";
AWS.config.update({ region: awsConfig.aws_cognito_region });

export default () => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    useEffect(() => {
        Auth.currentCredentials().then(function (creds) {
            AWS.config.update(creds);
        });
    }, []);

    async function validate() {
        const imageBase64String = webcamRef.current.getScreenshot();
        const base64Image = imageBase64String.split(";base64,").pop();
        const imageBuffer = new Buffer(base64Image, "base64");
        let rekognition = new AWS.Rekognition();
        let params = {
            Attributes: ["ALL"],
            Image: {
                Bytes: imageBuffer,
            },
        };
        let faceDetectResponse = await rekognition
            .detectFaces(params)
            .promise();
        if (faceDetectResponse.$response.error) {
            console.log(faceDetectResponse.$response.error.message);
        } else {
            console.log(faceDetectResponse.$response);
        }
    }

    return (
        <div className="w-[512px] mx-auto">
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
                    className={`z-10 ${image !== null ? "block" : "hidden"}`}
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
                    className="bg-black text-white rounded px-4 py-2"
                    onClick={useCallback(() => {
                        {
                            setImage(webcamRef.current.getScreenshot());
                        }
                    }, [webcamRef])}
                >
                    Capture
                </button>
                <button
                    onClick={validate}
                    className="bg-black text-white rounded px-4 py-2"
                >
                    Validate
                </button>
            </div>
        </div>
    );
};
