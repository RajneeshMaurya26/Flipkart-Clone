import { userConstants } from "../actions/constants";

const initialState = {
    error: null,
    loading: false,
    message: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case userConstants.SIGNUP_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.SIGNUP_REGISTER_SUCCESS:
            state = {
                ...state,
                loading:false,
                message:action.payload.message
            }
            break;
        case userConstants.SIGNUP_REGISTER_FAILURE:
            state = {
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
        default:
            break;
    }
    return state;
}