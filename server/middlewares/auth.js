const jwt = require("jsonwebtoken");

exports.isAuthentication = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "User is not loggedIn" });
    }


    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) return res.status(403).json({ success: false, message: "Invalid token!" });
        req.user = decode;
        next();
    });
}