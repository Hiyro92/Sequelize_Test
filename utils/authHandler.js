const jwt = require("jsonwebtoken")

module.exports = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if (authHeader){
        try{
            const token = authHeader.split(" ")[1]
            const user = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
            req.user = user
        }catch(err){
            res.status(401)
            next(err)
        }
    }
    next()
}