const express = require("express")
const {sequelize} = require("./models/index")

require('dotenv').config()
const app = express()

app.use(require("morgan")("dev"))
app.use(require("helmet")())
app.use(express.json())
app.use(require("./utils/authHandler"))

app.get("/", (req,res)=>{
    console.log(req.user);
    res.json({messenge: "🍺It works🍺"})
})

app.use("/api/v1",require("./router/index"))

app.use(require("./utils/notFoundHandler"));
app.use(require("./utils/errorHandler"));

const port = process.env.APP_PORT || 5300
app.listen(port, async()=>{
  console.log(`Server is runing under http://localhost:${port}`)  
  sequelize.sync({ alter: true , logging: false})
})