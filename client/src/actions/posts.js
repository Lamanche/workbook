import { POST_TYPE, POST_CATEGORY, POST_USER_TYPE, POST_CATEGORY_TYPE, LOADING, FINISHED_LOADING } from './types.js';

export const postType = (e) => {
    return {
        type: POST_TYPE,
        payload: e
    }
}

export const postCategory = (e) => {
    return {
        type: POST_CATEGORY,
        payload: e
    }
}

export const postUserType = (e) => {
    return {
        type: POST_USER_TYPE,
        payload: e
    }
}

export const postCategoryType = (e) => {
    return {
        type: POST_CATEGORY_TYPE,
        payload: e
    }
}

export const loading = () => {
    return {
        type: LOADING,
    }
}

export const finishedLoading = () => {
    return {
        type: FINISHED_LOADING,
    }
}