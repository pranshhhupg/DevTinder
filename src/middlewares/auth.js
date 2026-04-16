const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        // ✅ Allow preflight
        if (req.method === "OPTIONS") {
            return next();
        }

        const { token } = req.cookies || {};

        if (!token) {
            return res.status(401).json({ message: "Please log-in" });
        }

        const decodedObj = jwt.verify(token, "devTinder@1210");

        const { userId } = decodedObj;

        if (!userId) {
            return res.status(401).json({ message: "User not found" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: "User does not exist" });
        }

        req.userId = userId;
        req.user = user;

        next();
    } catch (err) {
        // ✅ Always 401 for auth failure
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = {
    userAuth,
}