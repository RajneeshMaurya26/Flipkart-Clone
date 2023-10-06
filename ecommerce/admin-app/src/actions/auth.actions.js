import { authConstants } from './constants';
import axiosInstance from '../helpers/axios';

// Action Creator for User Login
export const login = (user) => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.LOGIN_REQUEST,
            payload: { ...user }
        });

        try {
            const res = await axiosInstance.post('/admin/signin', { ...user });

            if (res.status === 200) {
                const { token, user } = res.data;

                // Store the token in local storage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: { token, user }
                });
            } else {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: 'Login failed' }
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Login failed' }
            });
        }
    };
};

// Action Creator for Checking if User is Logged In
export const isLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');

        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));

            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: { token, user }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Not logged in' }
            });
        }
    };
};

export const signout = () => {
    return async (dispatch) => {
        try {
            dispatch({type:authConstants.LOGOUT_REQUEST});
            // Clear local storage (assumed to be for user authentication)
            const res = await axiosInstance.post('admin/signout');

            if(res.status == 200){
                localStorage.clear();
            // Dispatch the logout success action
                dispatch({
                    type: authConstants.LOGOUT_SUCCESS,
                    payload: { message: 'Logout Successfully'}
                });
            }else{
                dispatch({
                    type:authConstants.LOGIN_FAILURE,
                    payload:{
                        error:res.data.error
                    }
                })
            }
            
        } catch (error) {
            // Handle any errors that occur during signout
            console.error('Signout error:', error);
            // Optionally, dispatch an error action or perform other error-handling logic
        }
    }

};

