const express = require("express");
const router = express.Router();
const detalleRemitoControllers = require("../controllers/detalleRemitoControllers");

router.get("/detalleRemitos", detalleRemitoControllers.getAllDetalles);
router.get("/detalleRemitos/:id", detalleRemitoControllers.getDetalleRemitoByID);
router.post("/detalleRemitos", detalleRemitoControllers.addDetalleRemito);
router.delete("/detalleRemitos/:id", detalleRemitoControllers.dropDetalleRemito);
router.post("/detalleRemitos/:id", detalleRemitoControllers.upDetalleRemito);
router.put("/detalleRemitos/:id", detalleRemitoControllers.updateDetalleRemitos);

module.exports = router;