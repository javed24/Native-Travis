import { RECEIVE_DATA, RECEIVE_GITHUB_DATA } from "../actions/test_action";

const initialState = {
    data: {},
    repos: []
}

export default ( state = initialState, action ) => {
    switch(action.type) {
        case RECEIVE_DATA: {
            console.log('action.payload: ', action.payload);
            return {
                ...state,
                data: action.payload
            }
        }
        case RECEIVE_GITHUB_DATA:
            return {
                ...state,
                repos: action.payload
            }
        default:
            return state;
    }
}