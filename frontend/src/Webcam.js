import React from "react";
import Webcam from "react-webcam";


const WebcamComponent = () => <Webcam />;

function spicyimagethingy(imageSrc){
  console.log(imageSrc)
} 

export default function WebcamCapture({width, height, webcamRef}) {
    const webcam = <Webcam
        audio={false}
        ref={webcamRef}
        width={width}
        height={height}
        screenshotFormat="image/jpeg"
    />
    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        spicyimagethingy(imageSrc)
        },
        [webcamRef]
    );
    return (
        <>
        {webcam}
        </>
    );
};