var signs = require('../controllers/sign.server.controller');
module.exports = function(app) {
    app.route('/signs').post(signs.create).get(signs.render);
};