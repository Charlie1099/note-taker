const router = require("express").Router()

const noteRoutes = require("../apiRoutes/noteRoutes");
const htmlRoutes = require("../htmlroutes/index")

router.use(noteRoutes)
router.use(htmlRoutes)

module.exports = router