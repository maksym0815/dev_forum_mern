import * as actions from "../actions/actionTypes";

const initialState = {
    isLoading: false,
    errorOccured: {
        flag: false,
        message: ""
    }
}

const reducer = (state = initialState, action)=>{
    switch (action.type){
        case actions.START_LOADING:
            return {...state, isLoading: true};
        case actions.STOP_LOADING:
            return {...state, isLoading: false};
        case actions.START_ERROR:
            return {
                ...state,
                errorOccured: {
                    flag: true,
                    message: action.message
                }};
        case actions.STOP_ERROR:
            return {
                ...state,
                errorOccured: {
                flag: false,
                message: ""
                }};
        default:
            return state;
    }
}

export default reducer;