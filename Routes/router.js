const express=require('express')
const router=new express.Router();
const userController = require('../Controllers/userController')
const categoryController = require('../Controllers/CategoryController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerconfig =require('../Middlewares/multerMiddleware')

router.post("/users/register",userController.register)
router.post("/users/login",userController.login)

// Admin routes 
router.post("/category/add",jwtMiddleware,categoryController.addCategory)
router.get("/category/all",jwtMiddleware,categoryController.getCategory)








module.exports = router;