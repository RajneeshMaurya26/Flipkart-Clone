import { categoryConstants } from "../actions/constants";

const initialState = {
    categories:[],
    error:null,
    loading:false
    
}

const builNewCategory = (parentId, categories,category) => {
    let newCategory = [];
    if(parentId == undefined){
      return [
        ...categories,
        {
          _id:category._id,
          name:category.name,
          slug:category.slug,
          children:[]
        }
      ];
    }
    for(let cat of categories){
        if(cat._id === parentId){
            newCategory.push({
                ...cat,
                children:cat.children ? builNewCategory(parentId,[...cat.children,{
                    _id:category._id,
                    name:category.name,
                    slug:category.slug,
                    parentId:category.parentId,
                    children:category.children
                }], category):[]
            })
        }else{
            newCategory.push({
            ...cat,
            children:cat.children ? builNewCategory(parentId,cat.children,category):[]
            })
            
        }
    }

    return newCategory;

}

export default (state = initialState, action) => {
    switch (action.type) {
      case categoryConstants.GETALLCATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case categoryConstants.GETALLCATEGORY_SUCCESS:
        return {
          ...state,
          categories: action.payload.categories,
          loading: false,
        };
  
      case categoryConstants.GETALLCATEGORY_FAILURE:
        return {
          ...state,
          error: action.payload.error,
          loading: false,
        };
  
      case categoryConstants.ADDCATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case categoryConstants.ADDCATEGORY_SUCCESS:
        const category = action.payload.category;
        const updatedCategory = builNewCategory(category.parentId, state.categories, category);
        return {
          ...state,
          categories: updatedCategory,
          loading: false,
        };
  
      case categoryConstants.ADDCATEGORY_FAILURE:
        return {
          ...state,
          error: action.payload.error,
          loading: false,
        };
  
      default:
        return state;
    }
  };
  