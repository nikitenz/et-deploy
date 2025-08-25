import jwt from "jsonwebtoken"

export const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({message: "Access denied. No token provided."});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //attach decoded user data (id, role, etc.) to request
        next();
    } catch (error) {
        return res.status(403).json({message: "Invalid or expired token."});
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({message: "Forbidden: You don't have access."});
        }
        next();
    }
}