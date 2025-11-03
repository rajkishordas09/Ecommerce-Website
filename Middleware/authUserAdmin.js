const authUserAdmin = (req, res, next) => {
    if (req.role === 'admin' || req.role === 'user') {
        return next()
    }
    res.status(404).json({ message: "u are not authrized for this request" })
}
module.exports = authUserAdmin;