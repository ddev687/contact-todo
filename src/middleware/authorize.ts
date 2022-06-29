const jwt = require('jsonwebtoken');
import config from "../config";
import ApiError from "../utils/apiError";

const authorize = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader == null) {
        throw new ApiError(401, 'User not authorized');
    } else {
        jwt.verify(authHeader, config.accessTokenSecret, (err, user) => {
            if (err) {
                throw new ApiError(401, 'User not authorized');
            }
            req.user = user;
            next();
        })
    }
};

export { authorize }
