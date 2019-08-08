var authController = require('../controllers/authcontroller.js');

module.exports = function (app, passport) {

    app.get('/', authController.home)

    app.get('/dashboard', authController.dashboard)

}



