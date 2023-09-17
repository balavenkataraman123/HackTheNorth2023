import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'getImage' : ActorMethod<[string], string>,
  'uploadImage' : ActorMethod<[string], string>,
}
