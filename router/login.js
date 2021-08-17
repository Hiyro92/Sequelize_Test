const {Sequelize, User, Token} = require("../models/index")
const jwt = require("jsonwebtoken")
const router = require("express").Router()
const bcrypt = require("bcrypt")

const getAccessToken = (user) =>{
    return jwt.sign({username: user.username, roll: user.roll}, process.env.JWT_ACCESS_TOKEN, { expiresIn: '20m' })
}

router.post("/login", async(req,res,next)=>{
    const {username, passwort} = req.body
    try{
        if(username &&passwort){
            const user = await User.findOne({where:{
                username,
                deletedAt: null
            }})
            if(!user) {
                res.status(401)
                res.json({messenge:"Wrong username"})
                return
            }
            const validPasswort = await bcrypt.compare(passwort, user.passwort)
            if(!validPasswort){
                res.status(401)
                res.json({messenge:"Wrong passwort"})
                return
            }
            const accessToken = getAccessToken(user)
            const refreshToken = jwt.sign({username: user.username, roll: user.roll}, process.env.JWT_REFRESH_TOKEN)

            await Token.create({token: refreshToken})

            res.json({
                accessToken,
                refreshToken
            })
        }
    }catch(err){
        next(err)
    }
})

router.post("/token", async(req, res, next)=>{
    const {refreshToken} = req.body
    if(!refreshToken) return res.sendStatus(401)
    if(!Token.findOne({where:{token:refreshToken}})) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN,(err, user)=>{
        if(err) return res.sendStatus(403)
        const accessToken = getAccessToken(user)
        res.json({accessToken})
    })

})

router.post("/logout", async(req, res, next)=>{
    const {refreshToken} = req.body
    if(!refreshToken) return res.sendStatus(400)
    try{
        await Token.destroy({where:{token: refreshToken}})
        res.json("Logout successful")
    }catch(err){
        next(err)
    }
})

module.exports = router