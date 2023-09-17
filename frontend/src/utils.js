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
    return JSON.parse(localStorage.getItem('documents'))
}

// image = [key, description]
export const addImage = (image) => {
    const imageKeys = getImageKeys()
    imageKeys.push(image)
    localStorage.setItem('documents', JSON.stringify(imageKeys))
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