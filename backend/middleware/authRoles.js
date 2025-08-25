const authorizeRoles = async (req, res, next) => {
    const userRole = req.user.role;

    if(!allowedRoles.includes(userRole)) {
        return res.json({success: false, message: "Access denied, insufficient permissions"});
    }
    next();
}

export default authorizeRoles;