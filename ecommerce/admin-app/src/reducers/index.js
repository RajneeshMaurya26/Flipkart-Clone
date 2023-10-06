import authReducers from './auth.reducers';
import { combineReducers } from 'redux';
import userReducers from './user.reducers';
import productReducer from './product.reducers';
import categoryReducer from './category.reducers';
import orderReducer from './order.reducers';

const rootReducer = combineReducers({
    auth:authReducers,
    user:userReducers,
    product:productReducer,
    category:categoryReducer,
    order:orderReducer
});

export default rootReducer;