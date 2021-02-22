import { LOCATION } from './types.js';

export const location = (e) => {
    return {
        type: LOCATION,
        payload: e
    }
}