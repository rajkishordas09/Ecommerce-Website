const jwt = require('jsonwebtoken')

const authN = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(404).json({ error: "token is not provided" })
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'my_secret_rajkishordas09')
        req.username = decoded.username;
        req.role = decoded.role;
        req.userID = decoded.userID;
        next()
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }

}
module.exports = authN;