const category =require('../Models/categorySchema')


exports.addCategory =async (req, res)=>{
    console.log("inside addcategory",req.body);
    const {categoryName,date} = req.body;

    try {
        const existingCategory = await category.findOne({categoryName})
        if(existingCategory){
            return res.status(406).json("Category already exists")
        }else{
            const newCategory = new category({
                categoryName,
                date
            })
            await newCategory.save()
            return res.status(200).json(
                "Category added successfully"
            )
        }
    } catch (error) {
        res.status(401).json("Error creating category", error);
    }
}

exports.getCategory =async (req, res)=>{
    try {
        const categories = await category.find()
        return res.status(200).json(categories)
    } catch (error) {
        res.status(401).json("Error getting categories", error);
    }
}