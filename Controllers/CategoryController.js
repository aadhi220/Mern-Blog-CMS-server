const Category = require("../Models/categorySchema");

exports.addCategory = async (req, res) => {
  console.log("inside addcategory", req.body);
  const { category, created_at } = req.body;
//   console.log(category, created_at);

  try {
    const existingCategory = await Category.findOne({ category });
    if (existingCategory) {
      return res.status(406).json("Category already exists");
    } else {
      const newCategory = new Category({
        category: category,
        created_at: created_at,
      });
      await newCategory.save();
      return res.status(200).json("Category added successfully");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error creating category", details: error.message });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    res.status(401).json("Error getting categories", error);
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCategory = await Category.findByIdAndDelete(id);

    if (!deleteCategory) {
      // If the category with the specified ID is not found
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(deleteCategory);
  } catch (error) {
    console.error('Error deleting category:', error);

    if (error.name === 'CastError') {
      // If the provided ID is not a valid ObjectId
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};