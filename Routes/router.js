const express=require('express')
const router=new express.Router();
const userController = require('../Controllers/userController')
const categoryController = require('../Controllers/CategoryController')
const blogController = require('../Controllers/BlogController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig =require('../Middlewares/multerMiddleware')

router.post("/users/register",userController.register)
router.post("/users/login",userController.login)

// Admin routes 
router.post("/category/add",jwtMiddleware,categoryController.addCategory)
router.get("/category/all",jwtMiddleware,categoryController.getAllCategory)
router.delete("/category/delete/:id",jwtMiddleware,categoryController.deleteCategory)
router.get("/users/all",jwtMiddleware,userController.getAllUsers)
router.get("/users/user/:id",jwtMiddleware,userController.getUserByid)
router.delete("/users/delete/:id",jwtMiddleware,userController.deleteUser)
router.patch("/users/setAuthor",jwtMiddleware,userController.setAuthor)



router.post("/blogs/add",jwtMiddleware,multerConfig,blogController.addBlog)
router.post("/blogs/all",jwtMiddleware,blogController.getAllBlog)



module.exports = router;