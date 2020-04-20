var Sign = require('mongoose').model('Sign');
exports.create = function (req, res, next) {
    var sign = new Sign(req.body);
    var comment2 = req.body.comment;
    var session = req.session;
    session.comment = comment2;
    sign.save(function(err) {
        if (err) {
            return next(err);
        } else {
            if(session.user.role === "patient") {
                res.redirect('/patient')
            } else {
                res.redirect('/nurse')
            }
            
        }
    });      
};

exports.render = function (req, res) {
    //make a reference to the session object
    var session = req.session;
    //check if username is stored in session object
        res.render('addSign', {
            user: session._id 
        });
  
};