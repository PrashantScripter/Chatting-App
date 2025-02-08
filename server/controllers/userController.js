const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { isAuthentication } = require('../middlewares/auth');
const upload = require('../cloudinary/cloudinaryMulterConfig');

// register new user
exports.RegisterUser = async (req, res) => {
    try {
        const { fullName, email, password, gender } = req.body;

        if (!fullName || !email || !password || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(409).json({ success: false, message: "User already exists with this Email" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            gender,
        })

        await newUser.save();

        res.status(201).json({ message: 'Account created Successfully' });

    } catch (error) {
        console.log(error);
    }
};

//login already exist user 
exports.LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "All field are required" })

        const user = await User.findOne({ email }).select("+password");

        if (!user) return res.status(404).json({ message: "User doesn't exists." });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password or email",
            });
        }

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '5d' });

        const allFriends = user.friends
            ? await Promise.all(user.friends.map(async (friend) => await User.findById(friend)))
            : [];

        res.cookie('token', token, {
            maxAge: 5 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).status(200).json({ user, friends: allFriends, message: "Logged in successfully!" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


//logout the user
exports.LogOutUser = (req, res) => {
    try {
        res.cookie('token', "", {
            maxAge: "",
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).status(201).json({ message: "logged Out" });
    } catch (error) {
        console.log(error);
    }
};

//get specific user profile by his id
exports.GetUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userInfo = await User.findById(userId);

        if (!userInfo) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ userInfo });
    } catch (error) {
        console.log(error);
    }
};

//get all the user available in the db
exports.GetAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json({
            success: true,
            users
        })
    } catch (error) {
        console.log(error);
    }
};

// update profile photo
exports.UpdateUserProfile = [
    upload.single('file'),
    async (req, res) => {
        try {

            if (!req.file) {
                return res.status(400).json({
                    message: "please select the photo!"
                });
            };

            const loggedInUserId = req.user.userId;

            const authUserProfile = await User.findById(loggedInUserId);

            if (!authUserProfile) {
                return res.status(400).json({ message: "user is not logged In!" })
            }
            else {
                authUserProfile.profilePhoto = req.file.path;
            }

            await authUserProfile.save();

            return res.status(200).json({
                user: authUserProfile,
                message: "Profile picture updated successfully! "
            })

        } catch (error) {
            console.log(error)
        }
    }
];

//delete user Profile permanently;
exports.DeleteUserProfile = async (req, res) => {
    try {
        const loggedInUserId = req.user.userId;

        if (!loggedInUserId) return res.status(400).json({ message: "user is not authorized!" });

        await User.findByIdAndDelete(loggedInUserId);

        return res.status(200).json({
            message: "Account Deleted successfully!"
        })

    } catch (error) {
        console.log(error);
    }
};