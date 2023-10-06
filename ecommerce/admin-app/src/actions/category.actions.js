import axiosInstance from "../helpers/axios"
import { categoryConstants } from "./constants"


export const getAllCategory = () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.GETALLCATEGORY_REQUEST })
        try {
            const res = await axiosInstance.get('/category/getCategory');
            if(res.status === 200){
                const {categoryList} = res.data;
                dispatch({
                    type:categoryConstants.GETALLCATEGORY_SUCCESS,
                    payload:{
                        categories:categoryList
                    }
                });
            }
            else{
                dispatch({
                    type:categoryConstants.GETALLCATEGORY_FAILURE,
                    payload:{
                        error:res.data.error
                    }
                });
            }
        } catch (error) {
            dispatch({
                type:categoryConstants.GETALLCATEGORY_FAILURE,
                payload:{
                    error:'Error ocurred while fetching'
                }
            });
        }
    }
}


export const addCategory = (form) => {
    return async(dispatch) => {
        dispatch({type:categoryConstants.ADDCATEGORY_REQUEST});
        try {
            
            const res = await axiosInstance.post('/category/create',form);
            if(res.status === 200){
                dispatch({
                    type:categoryConstants.ADDCATEGORY_SUCCESS,
                    payload:{category:res.data.categories}
                });
            }else{
                dispatch({
                    type:categoryConstants.ADDCATEGORY_FAILURE,
                    payload:res.data.error
                })
            }

        } catch (error) {
            dispatch({
                type:categoryConstants.ADDCATEGORY_FAILURE,
                payload:{error:'Error ocurred while sending'}
            })
        }
    }
}