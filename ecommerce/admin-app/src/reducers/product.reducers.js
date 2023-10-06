import { productConstants } from "../actions/constants";

const initialState = {
    message: '',
    error: null,
    loading: false
}


export default (state = initialState, action) => {
    switch (action.type) {
        case productConstants.ADD_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.ADD_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message

            }
            break;
        case productConstants.ADD_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error

            }
            break;
        default:
            break;
    }
    return state;
}