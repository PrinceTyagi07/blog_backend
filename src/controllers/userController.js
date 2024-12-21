const User = require('../models/User_Model')
const genereteToken = require('../middleware/generateToken')
// logic to ctreate a new user 

exports.Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, password, username });
        console.log(user);
        await user.save();
        res.status(200).send({ message: "user signup successfully ", user:user })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error occur while creating a new user or SignUp" })

    }
}

// logic for login
exports.Login = async (req, res) => {
    try {
        // console.log(req.body);
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("no User found")
        }
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return res.status(400).send("Invalid password")
        }

        // generate the token
        const token = await genereteToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        })
        console.log("token", token)
        res.status(200).send({
            message: "user login successfully ",
            token: token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }

        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error occur while Login" })

    }
}

// logout a user ;
exports.Logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send({ message: "User logout successfully" });
    } catch (error) {
        console.log("Failed to logout ", error)
        res.status(500).json({
            message: "Error occur while logout"
        })
    }
}

// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'id email role');
        res.status(200).send({ message: "user found successfully ", users })
    } catch (error) {
        console.log("error in fatching user", error);
        res.status(500).json({ message: "failed to fetch user " })
    }
}
// delete a user from db
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        console.log("hello")
        if (!user) {
            return res.status(404).json({ message: "user not found " })
        }
        console.log("nexr")

        res.status(200).send({
            message: "user deleted sucessfully ",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error occur while delete user" })
    }
}

// update a user role
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        res.status(200).send({
            message: "user role updated successfully",
            user: user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error occur while update user" })
    }
} 

