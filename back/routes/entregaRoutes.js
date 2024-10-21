const express = require("express");
const router = express.Router();
const entregaControllers = require("../controllers/entregaControllers");

router.get("/entregas", entregaControllers.getAllEntregas);
router.get("/entregas/:id", entregaControllers.getEntregaByID);

module.exports = router; 