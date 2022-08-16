const userController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post("/register", userController.Register);
    app.post("/login", userController.Login);
    app.post("/logout", userController.Logout);
    app.get("/api/current-user", userController.getLoggedInUser)
};