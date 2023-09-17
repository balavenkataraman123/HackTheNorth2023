import React, {useState, useEffect, useRef} from 'react'
import WebcamCapture from './Webcam'
import { Base64Image, registerDocument} from './utils'

const stickBorder = {
    position: 'absolute', 
    left: '0', 
    right: '0', 
    top: '0', 
    bottom: '0'
}

const PictureFrame = (props) => {
    const CORNER_LEN = '30px'
    const CORNER_OFF = '-10px'
    const BORDER = 'solid 3px black'
    return <div style={{width: '100%', height: '100%', position: 'relative'}}>
        <div style={{
            width: `${CORNER_LEN}`, 
            height: `${CORNER_LEN}`, 
            position: 'absolute',
            left: `${CORNER_OFF}`,
            top: `${CORNER_OFF}`,
            borderTop: BORDER,
            borderLeft: BORDER
        }}></div>
        {props.children}
        <div style={{
            width: `${CORNER_LEN}`, 
            height: `${CORNER_LEN}`, 
            position: 'absolute', 
            right: `${CORNER_OFF}`,
            bottom: `${CORNER_OFF}`,
            borderRight: BORDER,
            borderBottom: BORDER
        }}></div>
    </div>
}

const PhotoButton = ({onClick, size}) => {
    const BORDER = "solid 3px black"
    return <div style={{
        width: size, 
        height: size, 
        border: BORDER, 
        borderRadius: '80px',
        margin: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundColor: 'white'
    }} onClick={onClick}></div>
}

const CameraPage = ({pictureTaken}) => {
    const container = useRef(null)
    const [cWidth, setWidth] = useState(500)
    const [cHeight, setHeight] = useState(500)
    const webcamRef = useRef(undefined)
    useEffect(() => {
        if(container && container.current){
            setWidth(container.current.offsetWidth)
            setHeight(container.current.offsetHeight)
        }
    }, [container])

    const onPicture = () => {
        if(webcamRef.current){
            pictureTaken(webcamRef.current.getScreenshot())
        }
    }

    const childStretch = {
        display: 'flex', 
        alignItems: 'stretch', 
        flexDirection: 'column'
    }
    return <div style={{...stickBorder, ...childStretch, padding: '20px'}}>
        <div style={{flexGrow: '10'}} ref={container}>
            <PictureFrame>
                <WebcamCapture width={cWidth} height={cHeight} webcamRef={webcamRef}/>
            </PictureFrame>
        </div>
        <div style={{flexGrow: '1', display: 'flex', flexDirection: 'row', paddingTop: '10px', paddingBottom: '10px'}}>
            <PhotoButton size='60px' onClick={onPicture}/>
        </div>
    </div>
}

export const DescriptionPage = ({imageStr}) => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const BORDER = 'solid 3px black'

    const upload = async () => {
        await registerDocument(imageStr, `${title}: ${desc}`)
        alert('document uploaded successfully!')
        window.location.href = "/"
    }

    return <div style={{...stickBorder, display: 'flex', alignItems: 'stretch', flexDirection: 'column', padding: '20px'}}>
        <div style={{flexGrow: '4', marginBottom: '20px'}}>
            <PictureFrame>
                <Base64Image b64={imageStr} />
            </PictureFrame>
        </div>
        <input type="text" placeholder="Title" className="themed-textbox" value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <input type="text" placeholder="Description" className="themed-textbox" style={{height: '5em'}} value={desc} onChange={(e) => setDesc(e.target.value)}></input>
        <div style={{textAlign: 'center'}}>
            <input type="submit" value="Upload Document" className='themed-button' onClick={upload}></input>
        </div>
    </div>
}

export const PicturePage = () => {
    document.body.classList.add('full-height')
    document.body.style.backgroundColor = 'lightgray'
    document.documentElement.classList.add('full-height')
    document.getElementById('root').classList.add('full-height')
    const [curPic, setPic] = useState(undefined)
    const [step, setStep] = useState(0)
    const picTaken = (imageStr) => {
        setPic(imageStr)
        setStep(1)
    }
    if(step === 0) return <CameraPage pictureTaken={picTaken} />
    else return <DescriptionPage imageStr={curPic}/>
}