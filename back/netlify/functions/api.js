const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const RoutesClientes = require("../../routes/clientRoutes");
const RoutesRemitos = require("../../routes/remitoRoutes");
const RoutesDetalleRemitos = require("../../routes/detalleRemitoRoutes");
const RoutesEntregas = require("../../routes/entregaRoutes");
const RoutesDetalleEntregas = require("../../routes/detalleEntregaRoutes");
app.use("/api", RoutesClientes, RoutesRemitos, RoutesDetalleRemitos, RoutesEntregas, RoutesDetalleEntregas);

app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, X-UserId, X-Nonce" +
        ", X-Secret, X-Ts, X-Sig, X-Vendor-Sig, X-Vendor-Apikey, X-Vendor-Nonce, X-Vendor-Ts, X-ProfileId" +
        ", X-Authorization, Authorization, Token, Pragma, Cache-Control, Expires"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "HEAD,OPTIONS,GET,PUT,POST,DELETE"
    );
    next();
});

module.exports.handler = serverless(app);

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
}