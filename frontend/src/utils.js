import React from 'react'
import {Agent} from '@dfinity/agent'
import {createActor} from './declarations/backend'
import * as CryptoJS from 'crypto-js'

const agent = createActor("be2us-64aaa-aaaaa-qaabq-cai", {agentOptions: {host: 'http://127.0.0.1:4943/'}})

const getKey = () => {
    if(localStorage.getItem('private_key') === null) {
        localStorage.setItem('private_key', CryptoJS.lib.WordArray.random(32))
    }
    return localStorage.getItem('private_key')
}

export const getImageKeys = () => {
    if(localStorage.getItem('documents') === null) {
        localStorage.setItem('documents', JSON.stringify([[], []]))
    }
    return JSON.parse(localStorage.getItem('documents'))[0]
}

export const getDescription = () => {
    if(localStorage.getItem('documents') === null) {
        localStorage.setItem('documents', JSON.stringify([[], []]))
    }
    return JSON.parse(localStorage.getItem('documents'))[1]
}

export const addImage = (key, description) => {
    const imageKeys = getImageKeys()
    imageKeys.push(key)
    const imageDescription = getDescription()
    imageDescription.push(description)
    localStorage.setItem('documents', JSON.stringify([imageKeys, imageDescription]))
    return imageKeys
}

export const Base64Image = ({b64}) => {
    return <img src={b64} alt=""></img>
}

// returns as a b64 string
export const getImageByKey = async (key) => {
    const b64Image = await agent.getImage(key)
    return b64Image
}

// use a b64 string
const uploadImage = async (b64Image) => {
    const key = await agent.uploadImage(b64Image)
    return key
}

export const encryptImage = (b64) => {
    let secretKey = getKey()

    secretKey = CryptoJS.enc.Base64.parse(CryptoJS.enc.Utf8.parse(secretKey).toString(CryptoJS.enc.Base64)).toString(CryptoJS.enc.Utf8).padEnd(32, '0');

    const inputBase64 = b64
    const inputBytes = Buffer.from(inputBase64, 'base64');

    const encryptedData = CryptoJS.AES.encrypt(inputBytes.toString('hex'), secretKey).toString();

    const encryptedDataBase64 = Buffer.from(encryptedData).toString('base64');

    return encryptedDataBase64;
}

export const decryptImage = (b64) => {
    let secretKey = getKey()

    const encryptedDataBase64 = b64
    const encryptedData = Buffer.from(encryptedDataBase64, 'base64').toString('utf8');
    
    const decryptedDataHex = CryptoJS.AES.decrypt(encryptedData, secretKey);
    
    const decryptedBytes = Buffer.from(decryptedDataHex.toString(CryptoJS.enc.Utf8), 'hex');
    
    return Buffer.from(decryptedBytes).toString('base64');
}

// TODO encrypt the image!
export const registerDocument = async (rawB64Image, description) => {
    const key = await uploadImage(rawB64Image)
    addImage(key, description)
}