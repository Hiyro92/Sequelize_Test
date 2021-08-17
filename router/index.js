const router = require("express").Router()

router.use("/user", require("./user"))
router.use("/", require("./login"))

module.exports = router