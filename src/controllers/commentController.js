const Comment = require('../models/comment_model')

// logic to create a comment 

exports.createComment= async (req,res)=>{
  try {
    console.log(req.body);
    const newcomment = new Comment(req.body);
    await newcomment.save();
    res.status(200).send({
        message: "COMMENT CREATED SUCCESSFULLY ",
        comment :newcomment
    })
  } catch (error) {
    console.error(error);
    res.status(500).send({message:"Error occur while creating a new comment"})
  }

}

// get all comment count
exports.getCommentCount =async (req,res)=>{
    try {
     const totalcomments = await comment.countDocuments({}) ;
     res.status(200).send({message:"Total commment count ",totalcomments})  
    } catch (error) {
        console.error(error);
        res.status(500).send({message:"Error occur while getting comment count "})       
    }
}
