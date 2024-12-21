const mongoose = require('mongoose')
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
       
    },
    content: {
        type: Object,
        required: true
    },
    location: {
        type: String,
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    coverImg: {
        type: String,
    },
    category: {
        type: String,
    },
    rating: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;