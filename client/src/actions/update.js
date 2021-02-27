import { UPDATE } from './types.js';

export const update = (e) => {
    return {
        type: UPDATE,
        payload: e
    }
}