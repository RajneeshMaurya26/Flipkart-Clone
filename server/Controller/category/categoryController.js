import Category from '../../Model/categorySchema.js';
import slugify from 'slugify';


function createCategories(categories,parentId = null){
    const categoryList = [];
    let category;
    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined);

    }else{
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for(let cate of category){
        categoryList.push({
            _id:cate._id,
            name:cate.name,
            slug:cate.slug,
            parentId:cate.parentId,
            children:createCategories(categories,cate._id)
        })
    }
    return categoryList;
};

export const createCategory = async(req, res) => {
    try {
        const categoryObj = {
            name:req.body.name,
            slug:slugify(req.body.name)
        }
        if(req.file){
            categoryObj.categoryImage = process.env.API + '/public/'+req.file.filename;
        }
        if(req.body.parentId){
            categoryObj.parentId = req.body.parentId;
        }
    
        const cat = new Category(categoryObj); 
        const categories = await cat.save();
        return res.status(200).json({categories});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
}

export const getCategory = async(req, res) => {
    try {
        const getCategories = await Category.find({}).exec();

        const categoryList = createCategories(getCategories);
        return res.status(200).json({categoryList});
    } catch (error) {
        return res.status(500).json({error : error.message});
    }

}