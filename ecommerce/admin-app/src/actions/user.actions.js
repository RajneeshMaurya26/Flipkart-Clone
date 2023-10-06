import { userConstants } from "./constants";
import axiosInstance from "../helpers/axios";


export const signup = (user) => {
    return async (dispatch) =>{
        dispatch({
            type:userConstants.SIGNUP_REGISTER_REQUEST,
            payload:{
                ...user
            }
        });

        try {
            
            const res = await axiosInstance.post('/admin/signup',{...user});
            if(res.status === 200){
                dispatch({
                    type:userConstants.SIGNUP_REGISTER_SUCCESS,
                    payload:{
                        message:res.data
                    }
                });
            }else{
                dispatch({
                    type:userConstants.SIGNUP_REGISTER_FAILURE,
                    payload:{
                        error:res.data.error
                    }
                })
            }
            

        } catch (error) {
            console.error('Signup error:', error);
            dispatch({
                type: userConstants.SIGNUP_REGISTER_FAILURE,
                payload: { error: 'Signup failed' }
            });
        }
    }
}