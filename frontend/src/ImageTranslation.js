//import Tesseract from 'tesseract.js';
import React, {useRef} from "react"
const { createWorker } = require('tesseract.js');


var firstclickx = -69;
var firstclicky = -69
var secondclickx = -69;
var secondclicky = -69;
const isPointInBox = (point, box) => {
  const [x, y] = point;
  const [x1, y1, x2, y2, x3, y3, x4, y4] = box;
  return x >= x1 && x <= x3 && y >= y1 && y <= y3;
};

const extractTextFromBox = async (imagePath, box) => {
  const worker = await createWorker({
    logger: m => console.log(m)
  });

  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  const { data: { lines } } = await worker.recognize(imagePath);

  let textsInsideBox = [];
  let xcoordinates = [];
  let ycoordinates = [];
  for (let line of lines) {
    const center = [
      line.bbox.x0 + (line.bbox.x1 - line.bbox.x0) / 2,
      line.bbox.y0 + (line.bbox.y1 - line.bbox.y0) / 2
    ];

    if (isPointInBox(center, box)) {
      textsInsideBox.push(line.text);
      xcoordinates.push(line.bbox.x0)
      ycoordinates.push(line.bbox.y0)
    }
  }

  await worker.terminate();

  return [textsInsideBox, xcoordinates, ycoordinates];
};


function updateclick(xcoord, ycoord, canvasRefz, base64){
  if((firstclickx == -69 && secondclickx == -69)){
    firstclickx = xcoord;
    firstclicky = ycoord;
    
  }
  else{
    secondclickx = xcoord;
    secondclicky = ycoord;
    const ctx = canvasRefz.current.getContext("2d");
    let width = secondclickx - firstclickx;
    let height = secondclicky - firstclicky;
    ctx.strokeRect(firstclickx, firstclicky, width, height);
    const predefinedBox = [firstclickx, firstclicky, secondclickx, firstclicky, secondclickx, secondclicky, firstclickx, secondclickx];
    extractTextFromBox(base64, predefinedBox).then(texts => {
    ctx.font = "30px Arial";
    var i = 0;
    while(i < texts[0].length){
      ctx.fillText(texts[0][i], texts[1][i], texts[2][i]);
      i++;
    }
    console.log(texts[0]);
    }).catch(error => {
    console.error("Error during OCR:", error);
    });
    firstclickx = -69;
    secondclickx = -69; 
  }


}

export default function TranslateImage() {
    const canvasRef = useRef();
    const base64 = localStorage.getItem('img')
   
    return (
    <>
    <h1>OCR TRANSLATION IMAGE SELECTING SEGMENTY THINGY</h1>
    <img style={{ display: "none" }} src={base64} id="imageid" alt=""></img>
    <canvas
           ref={canvasRef}
           width="1280"
           height="720"
           style={{ border: "2px solid black" }}
           onClick={(e) => {
            let rect = e.target.getBoundingClientRect();
             if (canvasRef.current) {
               updateclick(Math.min(Math.max(0,e.clientX - rect.left), rect.right-rect.left), Math.min(Math.max(0,e.clientY - rect.top), base64), canvasRef)
               //ctx.strokeRect(Math.min(Math.max(0,e.clientX - rect.left), rect.right-rect.left), Math.min(Math.max(0,e.clientY - rect.top), rect.bottom - rect.top)  , 40, 50);
             }
           }}
           onLoad={() => {
                console.log('hi')
                const ctx = canvasRef.current.getContext("2d");
                const img = document.getElementById("imageid");
                ctx.drawImage(img, 0, 0);
           }}
         ></canvas>
    <button
           onClick={() => {
             if (canvasRef.current) {
               const ctx = canvasRef.current.getContext("2d");
               ctx?.clearRect(0, 0, 1280, 720);
               const img = document.getElementById("imageid");
               ctx?.drawImage(img, 0, 0);                     
             }
           }}
         >
           CLEAR
    </button>
    </>
     );
   };