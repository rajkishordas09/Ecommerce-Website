const authAdminOnly = (req, res, next) => {
    if (req.role === 'admin') {
        return next()
    }
    res.status(404).json({ message: "you are not to authoraized for this Privileges" })
}

module.exports = authAdminOnly;