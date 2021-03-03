import { SET_POSTDATA, CLEAR_POSTDATA } from './types.js';

export const setPostData = (e) => {
    return {
        type: SET_POSTDATA,
        payload: e
    }
};

export const clearPostData = () => {
    return {
        type: CLEAR_POSTDATA,
    }
};