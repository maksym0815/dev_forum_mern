import * as actions from './actionTypes';

export const startLoading = ()=>{
    return {
        type: actions.START_LOADING
    }
}

export const endLoading = ()=>{
    return {
        type: actions.STOP_LOADING
    }
}

export const startError = (message)=>{
    return {
        type: actions.START_ERROR,
        message: message
    }
}

export const stopError = ()=>{
    return {
        type: actions.STOP_ERROR
    }
}