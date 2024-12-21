const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// hash password before saving the database

UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const hashespassword = await bcrypt.hash(user.password, 10);
    user.password = hashespassword;
    next();
})

// compares password when user tries to login
UserSchema.methods.comparePassword= function (givenPassword){
    return bcrypt.compare(givenPassword,this.password);
}

const User = mongoose.model('User', UserSchema);
module.exports = User;