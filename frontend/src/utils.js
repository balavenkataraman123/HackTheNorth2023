import React from 'react'
import {Agent} from '@dfinity/agent'
import {createActor} from './declarations/backend'
import * as crypto from 'crypto-js'

const agent = createActor("be2us-64aaa-aaaaa-qaabq-cai", {agentOptions: {host: 'http://127.0.0.1:4943/'}})

export const getKey = () => {
    if(localStorage.getItem('private_key') === null) {
        localStorage.setItem('private_key', crypto.lib.WordArray.random(32))
    }
    return localStorage.getItem('private_key')
}

export const getImageKeys = () => {
    if(localStorage.getItem('documents') === null) {
        localStorage.setItem('documents', JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem('documents'))[0]
}

export const getDescription = () => {
    if(localStorage.getItem('documents') === null) {
        localStorage.setItem('documents', JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem('documents'))[1]
}

export const addImage = (image) => {
    const imageKeys = getImageKeys()
    imageKeys.push(image)
    const imageDescription = getImageDescription()
    imageDescription.push(image)
    localStorage.setItem('documents', JSON.stringify([imageKeys, imageDescription]))
    return imageKeys
}

export const Base64Image = ({b64}) => {
    return <img src={`data:image/png;base64, ${b64}`} alt=""></img>
}

// returns as a b64 string
export const getImageByKey = async (key) => {
    const intArray = await agent.getImage(key)
    const decoder = new TextDecoder('utf8')
    const b64Image = btoa(decoder.decode(intArray))    
    console.log(intArray)
    return b64Image
}

// use a b64 string
export const uploadImage = async (b64Image) => {
    const encoder = new TextEncoder('utf8')
    const intArray = new Uint8Array(encoder.encode(atob(b64Image)))
    const key = await agent.uploadImage(intArray)
    console.log(intArray)
    return key
}

export const encryptImage = ({b64}) => {
    let secretKey = localStorage.getItem('private_key');

    secretKey = CryptoJS.enc.Base64.parse(CryptoJS.enc.Utf8.parse(secretKey).toString(CryptoJS.enc.Base64)).toString(CryptoJS.enc.Utf8).padEnd(32, '0');

    fs.writeFileSync('secretKey.txt', secretKey);

    const inputBase64 = fs.readFileSync('input.b64', 'utf8');
    const inputBytes = Buffer.from(inputBase64, 'base64');

    const encryptedData = CryptoJS.AES.encrypt(inputBytes.toString('hex'), secretKey).toString();

    const encryptedDataBase64 = Buffer.from(encryptedData).toString('base64');

    return encryptedDataBase64;
}

export const decryptImage = ({b64}) => {
    let secretKey = localStorage.getItem('private_key');

    const encryptedDataBase64 = fs.readFileSync('encrypted_output.b64', 'utf8');
    const encryptedData = Buffer.from(encryptedDataBase64, 'base64').toString('utf8');
    
    const decryptedDataHex = CryptoJS.AES.decrypt(encryptedData, secretKey);
    
    const decryptedBytes = Buffer.from(decryptedDataHex.toString(CryptoJS.enc.Utf8), 'hex');
    
    return decryptedDataBase64 = Buffer.from(decryptedBytes).toString('base64');
}