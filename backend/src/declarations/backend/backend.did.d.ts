import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'getImage' : ActorMethod<[string], Uint8Array | number[]>,
  'uploadImage' : ActorMethod<[Uint8Array | number[]], string>,
}
