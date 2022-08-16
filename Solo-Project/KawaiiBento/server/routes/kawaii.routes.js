const bentoController = require('../controllers/kawaii.controller');

module.exports = (app) => {
    app.get("/api/bento", bentoController.getAllBento);
    app.get("/api/bento/:id", bentoController.getBentoById);
    app.post("/api/bento", bentoController.createBento);
    app.put("/api/bento/:id", bentoController.updateBento);
    app.delete("/api/bento/:id", bentoController.deleteBento);
};