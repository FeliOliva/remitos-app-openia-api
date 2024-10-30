const express = require("express");
const router = express.Router();
const cuenta_corrienteControllers = require("../controllers/cuenta_corrienteControllers");

router.get("/cuentas_corrientes", cuenta_corrienteControllers.getAllCuentas_Corrientes);
router.get("/cuentas_corrientes/:id", cuenta_corrienteControllers.getCuenta_CorrienteByID);

module.exports = router;