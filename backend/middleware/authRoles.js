const authorizeRoles = async (req, res, next) => {
    if(!allowedRoles.includes(req.user.role)) {
        return res.json({success: false, message: "Access Denied"});
    }
    next();
}

export default authorizeRoles;