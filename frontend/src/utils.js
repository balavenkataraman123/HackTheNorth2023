import {Agent} from '@dfinity/agent'
import {createActor} from './declarations/backend'

const agent = createActor("be2us-64aaa-aaaaa-qaabq-cai", {actorOptions: {host: 'localhost'}})