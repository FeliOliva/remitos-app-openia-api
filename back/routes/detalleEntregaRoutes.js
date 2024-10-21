const express = require("express");
const router = express.Router();
const detalleEntregaControllers = require("../controllers/detalleEntregaControllers");

router.get("/detalleEntregas", detalleEntregaControllers.getAllDetalles);
router.get("/detalleEntregas/:id", detalleEntregaControllers.getDetalleEntregaByID);
router.post("/detalleEntregas", detalleEntregaControllers.addDetalleEntrega);
router.delete("/detalleEntregas/:id", detalleEntregaControllers.dropDetalleEntrega);
router.post("/detalleEntregas/:id", detalleEntregaControllers.upDetalleEntrega);
router.put("/detalleEntregas/:id", detalleEntregaControllers.updateDetalleEntrega);

module.exports = router;