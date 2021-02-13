import { GETPROFILE, CLEARPROFILE } from './types.js';

export const getProfile = (e) => {
    return {
        type: GETPROFILE,
        payload: e
    }
}

export const clearProfile = () => {
    return {
        type: CLEARPROFILE
    }
}