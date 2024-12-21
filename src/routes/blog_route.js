const express= require('express');
const router =express.Router();
const isAdmin =require('../middleware/isAdmin')
const verifyToken = require('../middleware/verifyToken');
const blogController= require('../controllers/blogController')

router.get("/blogs", (req,res)=>{
    res.send("blog route is here ");
})
// route to create a post 
router.post('/create-post', verifyToken,isAdmin,blogController.createPost)
router.get('/getall',blogController.getAll)
router.get('/getbyid/:id',blogController.getbyId)
router.patch('/update-post/:id', verifyToken,blogController.update)
router.delete('/delete/:id', verifyToken,blogController.delete)
router.get("/related/:id",blogController.getRelatedBlog)
module.exports=router