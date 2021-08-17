const {Sequelize, User} = require("../models/index")
const router = require("express").Router()
const bcrypt = require("bcrypt")


router.get("/", async(req,res)=>{
    try{
        const users = await User.findAll()
        res.json(users)
    }catch(err){
        res.json(err).status(500)
    }
})

router.get("/:uuid", async(req,res)=>{
    const uuid = req.params.uuid
    try{
        const user = await User.findOne({where:{uuid}})
        res.json(user)
    }catch(err){
        res.json(err).status(500)
    }
})


router.post("/", async(req, res, next) =>{
    try{
        const {username, passwort} = req.body
        if(username && passwort){
            const hashedPasswort = await bcrypt.hash(passwort, 12)
            const user = await User.create({
                username, 
                passwort: hashedPasswort
            })
            res.json(user)
        }else {
            res.status(400)
            throw new Error("no username or passwort")
        }
    }
    catch(err){
        next(err)
    }
})

router.delete("/:uuid", async(req, res, next) =>{
    const uuid = req.params.uuid
    try{
        await User.update({deletedAt: new Date()}, {where:{uuid}})
        res.json({messenge: "User deleted"})
    }catch(err){
        next(err)
    }
})

module.exports = router