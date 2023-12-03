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
router.get("/category/all",categoryController.getAllCategory)
router.delete("/category/delete/:id",jwtMiddleware,categoryController.deleteCategory)
router.get("/users/all/:temp",jwtMiddleware,userController.getAllUsers)
router.get("/users/user/:id",jwtMiddleware,userController.getUserByid)
router.delete("/users/delete/:id",jwtMiddleware,userController.deleteUser)
router.patch("/users/setAuthor",jwtMiddleware,userController.setAuthor)
router.patch("/users/setAuthorReq",jwtMiddleware,multerConfig,userController.setAuthorReq)



router.post("/blogs/add",jwtMiddleware,multerConfig,blogController.addBlog)
router.get("/blogs/all",blogController.getAllBlog)
router.get("/blogs/getAuthorBlog",blogController.getAuthorBlog)
router.get("/blogs/get/:id",jwtMiddleware,blogController.getBlogById)
router.delete("/blogs/delete/:id",jwtMiddleware,blogController.deleteBlog)
router.patch("/blogs/viewCount",blogController.setViewCount)



module.exports = router;