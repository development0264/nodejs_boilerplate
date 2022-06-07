const jwt = require("jsonwebtoken")

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({ message: "Not authorized."});
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decode) => {
            if(err?.name==="TokenExpiredError") res.status(401).json({ message: `Your Token is Expired` }); //  token expired
            else if(err) res.status(403).json({ message: err.name }); // invalid token
            console.log("decode => ", decode)
            next()
        }
    )
}

module.exports = verifyJWT