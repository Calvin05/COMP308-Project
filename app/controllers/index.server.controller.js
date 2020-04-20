exports.render = function(req, res) {
    var value = " ";
    var email = req.body.email;
    var session = req.session;
    var comment = req.body.comment;
    session.comment = comment;
    session.email = email;
    if(session.email) {
        res.redirect('/feedback');
    } else {
        res.render('index', {
            validation: value
        });
    }
    // res.redirect('/feedback');

    console.log("GET request - User name = " + session.email);
    console.log("GET request - User name = " + session.comment);

};

exports.renderHome = function(req, res) {
    res.render('home');
};


exports.renderAddStudent = function(req, res) {
    res.render('signup');
}

exports.renderSearch = function(req, res) {
    res.render('search', {
        validation: " "
    });
}
