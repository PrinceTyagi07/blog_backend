const mongoose= require('mongoose');
require('dotenv').config();

const connectwithDb =async ()=>{
   await  mongoose.connect(process.env.MONGODB_URL,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
    .then(console.log("DB connected sucessfully"))
    .catch((err)=>{
        console.log("DB connection is failed")
        console.log(err);
        process.exit(1)
    })
};
module.exports = connectwithDb;