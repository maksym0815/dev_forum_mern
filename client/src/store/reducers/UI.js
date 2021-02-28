import * as actions from "../actions/actionTypes";

const initialState = {
    isLoading: false
}

const reducer = (state = initialState, action)=>{
    switch (action.type){
        case actions.START_LOADING:
            return {isLoading: true};
        case actions.STOP_LOADING:
            return {isLoading: false};
        default:
            return state;
    }
}

export default reducer;