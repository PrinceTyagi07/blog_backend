const express= require('express');
const router =express.Router();
const commentController =require('../controllers/commentController');

router.post('/post-comment',commentController.createComment);
router.get('/get-comment-count',commentController.getCommentCount)
module.exports=router