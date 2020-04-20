
module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    var logout = require('../controllers/logout.server.controller');
    var users = require('../controllers/user.server.controller');
    // var response = require('../controllers/response.server.controller');
    app.get('/', index.render);
    app.get('/login', index.render);
    app.get('/patient', users.patientDash);
    app.get('/nurse', users.nursetDash);
    // app.post('/feedback', feedback.render);
    app.get('/logout', logout.render);
    app.get('/signup', index.renderAddStudent);
    app.post('/login', users.login);
    app.post('/', users.login);
    app.get('/res', users.getresponse);
    app.post('/res', users.createresponse);
    app.get('/list', users.getlist);
    app.post('/list', users.diagnose);
    app.post('/detail', users.patientdetail);
    app.get('/tip', users.gettip);
    app.post('/tip', users.createtip);
    // app.post('/', function (req, res) {
    //     //console.log("POST request - User name = " + req.body.username);
    //     index.render(req, res);
    // });

};