const Blog = require('../models/blog_model');
const Comment = require('../models/comment_model')


// logic to create a post 
exports.createPost = async (req, res) => {
    try {
        // console.log(req.body);

        const newPost = new Blog({ ...req.body, author:req.userId });
        await newPost.save();
        res.status(200).json({
            newPost: newPost
        })
    } catch (error) {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Error creating post" });
        }
    }
}

// logic to getall post according to search 

exports.getAll = async (req, res) => {
    try {
        const { search, category, location } = req.query;

        let query = {};
        if (search) {
            query = {
                ...query,
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { content: { $regex: search, $options: 'i' } }
                ]
            }
        }

        if (category) {
            query = {
                ...query,
                category: category,

            }
        }
        if (location) {
            query = {
                ...query,
                location: location,

            }
        }

        const posts = await Blog.find(query).populate('author','email').sort({ createdAt: -1 });
        res.status(200).send(posts)
    } catch (error) {
        console.log(error);
        res.send({
            message: "error to get all post ",
            error: error
        })
    }
}

// get a single blog by id 

exports.getbyId = async (req, res) => {
    try {
        const PostId = req.params.id;
        const post = await Blog.findById(PostId);
        if (!post) {
            return res.status(404).send({
                message: "no post found"
            })
        }
        else {
            const comment = await Comment.find({ postId: PostId }).populate('user', "username email")
            console.log(comment)
            res.status(200).json({
                message: "post retrived  successfully",
                post: post
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error to get post acc to id  ",
            error: error
        })
    }
}

// update the  blog 

exports.update = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await Blog.findByIdAndUpdate(postId, req.body, { ...req.body },
            { new: true });

        if (!updatedPost) {
            return res.status(404).send({ message: "post not found" })
        }
        else {
            res.status(200).send({
                message: "post updated sucessfully",
                post: updatedPost,

            })
            console.log(updatedPost)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error to update a post acc to id  ",
            error: error
        })
    }
}

// logic for delete a blog 

exports.delete = async (req, res) => {
    try {
        const PostId = req.params.id;
        const post = await Blog.findByIdAndDelete(PostId);
        if (!post) {
            return res.status(404).send({
                message: "post not found"
            })
        }
        else {
            // delete related comment
            await comment.deleteMany({ PostId: PostId })
            res.status(200).send({
                message: "post deleted sucessfully",
                // post: post
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error to delete post ",
            error: error
        })
    }
}

// logic to get related blog 

exports.getRelatedBlog = async (req, res) => {
    try {
        const PostId = req.params.id;
        if (!id) {
            return res.status(400).send({
                message: "id is required"
            })
        }
        const post = await Blog.findById(PostId)
        if (!post) {
            return res.status(404).send({
                message: " blog related post not found"
            })
        }
        const titleRegex = new RegExp(post.title.split(' ').join('|'), 'i');
        const relatedQuery = {
            _id: { $ne: id }, // exclude the current blog by id 
            title: { $regex: titleRegex }
        }
        const relatedBlog = await Blog.find(relatedQuery);//.limit(5);
        res.status(200).send(relatedBlog)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error to fetch related post ",
            error: error
        })
    }
}