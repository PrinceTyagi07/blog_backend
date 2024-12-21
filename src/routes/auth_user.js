const express= require('express');
const router =express.Router();
const userController=  require('../controllers/userController')
// Signup a new user 
router.post('/signup',userController.Signup);
router.post('/login',userController.Login);
router.post("/logout",userController.Logout)
router.get('/users',userController.getAllUsers)
router.delete('/user/:id',userController.deleteUser)
router.put('/update/:id',userController.updateUser)
module.exports=router