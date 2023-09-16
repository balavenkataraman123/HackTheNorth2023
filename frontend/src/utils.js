import React from 'react'
import {Agent} from '@dfinity/agent'
import {createActor} from './declarations/backend'
import * as crypto from 'crypto-js'

const agent = createActor("be2us-64aaa-aaaaa-qaabq-cai", {actorOptions: {host: 'localhost'}})

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

export const addImageKey = (imageKey) => {
    const imageKeys = getImageKeys()
    imageKeys.push(imageKey)
    localStorage.setItem('documents', JSON.stringify(imageKeys))
    return imageKeys
}

export const Base64Image = ({b64}) => {
    return <img src={`data:image/png;base64, ${b64}`} alt=""></img>
}