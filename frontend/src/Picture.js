import React, {useState, useEffect} from 'react'

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

const CameraPage = () => {
    const childStretch = {
        display: 'flex', 
        alignItems: 'stretch', 
        flexDirection: 'column'
    }
    return <div style={{...stickBorder, ...childStretch, padding: '20px'}}>
        <div style={{flexGrow: '10'}}>
            <PictureFrame><div style={{width: '100%', height: '100%', backgroundColor: 'red', borderRadius: '20px'}}> </div></PictureFrame>
        </div>
        <div style={{flexGrow: '1', display: 'flex', flexDirection: 'row', paddingTop: '10px', paddingBottom: '10px'}}>
            <PhotoButton size='60px' onClick={() => {}}/>
        </div>
    </div>
}

export const DescriptionPage = () => {
    const MARGIN = '10px';
    const BORDER = "solid 3px black"
    const textBox = {
        marginTop: MARGIN,
        marginBottom: MARGIN,
        borderRadius: '5px',
        border: BORDER,
        color: 'black',
        height: '2em',
        fontSize: '1em'
    }

    return <div style={{...stickBorder, display: 'flex', alignItems: 'stretch', flexDirection: 'column', padding: '20px'}}>
        <div style={{flexGrow: '4', marginBottom: '20px'}}>
            <PictureFrame><div style={{width: '100%', height: '100%', backgroundColor: 'red', borderRadius: '20px'}}> </div></PictureFrame>
        </div>
        <input type="text" placeholder="Title" style={{...textBox}}></input>
        <input type="text" placeholder="Description" style={{...textBox, height: '5em'}}></input>
        <div style={{textAlign: 'center'}}>
            <input type="submit" value="Upload Document" style={{padding: '10px', border: BORDER, borderRadius: '5px', backgroundColor: 'white', fontWeight: 'bolder', fontSize: '0.7em'}}></input>
        </div>
    </div>
}

export const PicturePage = () => {
    document.body.classList.add('full-height')
    document.body.style.backgroundColor = 'lightgray'
    document.documentElement.classList.add('full-height')
    document.getElementById('root').classList.add('full-height')
    return <DescriptionPage />
}