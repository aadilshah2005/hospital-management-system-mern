
import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.UserToken;
        if (!token) {
            return res.status(401).json({
                success:false,
                message: "Unauthorized - No token",
                error:error.message
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();

    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            success:false,
            message: "Invalid token",
            error:error.message
        })
    }
}