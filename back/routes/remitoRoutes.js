const express = require("express");
const router = express.Router();
const remitoControllers = require("../controllers/remitoControllers");

router.get("/remitos", remitoControllers.getAllRemitos);
router.get("/remitos/:id", remitoControllers.getRemitoByID);

module.exports = router;