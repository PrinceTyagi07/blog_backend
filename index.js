const express = require('express');
const connect = require('./src/config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

// routes
const blogRoutes =  require('./src/routes/blog_route');
const commentRoutes =require('./src/routes/comment_routes');
const userRoutes =require('./src/routes/auth_user')

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// get route show something on desktop
app.get('/', (req, res) => {
    res.send("hello world this is a blog application ");
})


// CONNECT THE DATABASE
connect();

// parse options
app.use(cors());
app.use(express.json());

// mount the route
app.use('/api/blogs',blogRoutes);
app.use('/api/comment',commentRoutes);
app.use('/api/user',userRoutes);

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else {
        console.log(`app running on port ${PORT}`);
    }
})