import { $query, $update, StableBTreeMap, blob } from 'azle';


// This is a global variable that is stored on the heap
let pics = new StableBTreeMap<string, string>(0, 100, 10_000_000)

// Query calls complete quickly because they do not go through consensus
$query;
export function getImage(key: string): string {
    const ret = pics.get(key)
    const deadString = ""
    return ret.Some ? ret.Some : deadString
}

// Update calls take a few seconds to complete
// This is because they persist state changes and go through consensus
$update;
export function uploadImage(value: string): string {
    let randKey = undefined
    const chars = "abcdfeghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    do {
        randKey = new Array(80).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
    } while(pics.get(randKey).Some)
    pics.insert(randKey, value)
    return randKey
}