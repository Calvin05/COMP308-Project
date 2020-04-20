var User = require('mongoose').model('User');
var Sign = require('mongoose').model('Sign');
var Resp = require('mongoose').model('Response');
var Tip = require('mongoose').model('Tip');
exports.create = function (req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.redirect('/login')
        }
    });      
};

exports.login = function (req, res, next) {
    var value = " ";
    var username = req.body.username;
    var password = req.body.password;
    var session = req.session;
    session.username = username;
    if(username) {
        User.findOne({
            username: username
        }, (err, us) => {
            if (err) {
                return next(err);
            } else if(us === null) {
                res.render('index', {
                    validation: "Invalid User Name or Password!"
                });
            } else {
                req.username = us;
                session._id = us._id;
                var jsonUser = JSON.parse(JSON.stringify(us));
                session.user = jsonUser;
                if(!password) {
                    res.render('index', {
                        validation: "Invalid User Name or Password!"
                    });
                } else
                if(password === jsonUser.password.toString()) {
                    console.log("debug: " + jsonUser.role.toString());
                    if(jsonUser.role === "nurse")
                    {
                        res.redirect("/nurse")
                    } else
                    if(jsonUser.role === "patient")
                    {
                        // res.render('patient', {
                        //     user: jsonUser
                        // });
                        res.redirect("/patient")
                    }
                    
                } else {
                    res.render('index', {
                        validation: "User Name or Password!"
                    });
                }
            }
        }
        )
        // res.redirect('/feedback');
    } else {
        res.render('index', {
            vadilation: value
        });
    }
    // res.redirect('/feedback');
}


exports.patientDash = function(req, res) {
    var session = req.session;
    var tips = new Tip();
    Tip.find({}, (err, tp) => {
        if (err) { return getErrorMessage(err); }
        tips = tp;
    })
    Sign.find({user: session.user._id}, (err, signs) => {
        if (err) { return getErrorMessage(err); }
        Resp.find({user: session.user._id}, (err, resps) => {
            if (err) { return getErrorMessage(err); }
            res.render('patient', {
                user: session.user,
                signs: signs,
                reps: resps,
                tips: tips
            });
        })
        
    })
    
};

exports.patientdetail = function(req, res) {
    var name = req.body.name;
    var id = req.body.id;
    Sign.find({user:id}, (err, signs) => {
        if (err) { return getErrorMessage(err); }
        res.render('detail', {
            signs: signs,
            name: name
        });
    })
};


exports.nursetDash = function(req, res) {
    var session = req.session;
    var tips = new Tip();
    Tip.find({}, (err, tp) => {
        if (err) { return getErrorMessage(err); }
        tips = tp;
    })
    User.find({role: "patient"}, (err, patients) => {
        if (err) { return getErrorMessage(err); }
        Sign.find({user:session.user.id}, (err, signs) => {
            if (err) { return getErrorMessage(err); }
            res.render('nurse', {
                user: session.user,
                patients: patients,
                signs: signs,
                tips: tips
            });
        })
        
    })
};

exports.getresponse = function(req, res) {
    var session = req.session;
    res.render('addresponse', {
        user: session._id 
    });
};

exports.createresponse = function(req, res) {
    
    var response = new Resp(req.body);
    response.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.redirect('/patient')
        }
    });      
};

exports.getlist = function(req, res) {
    res.render('list');
};

exports.diagnose = function(req, res) {
    var first = req.body.first;
    var second = req.body.second;
    var third = req.body.third;

    var symptom;
    var advice;
    
    if(first === "1" && second === "1" && third === "1")
    {
        symptom = "Common cold"
        advice = "Drink more water, juice. Add more vitamins. Keep your body warm"
    } else if (first === "2" && second === "2" && third === "2")
    {
        symptom = "Muscle Pain"
        advice = "Take more rest. Eat more vegetable. Avoid hard exercise"
    } else 
    {
        symptom = "Not Available"
        advice = "Please contact us for better diagnosis "
    }

    res.render('result', {
        symptom: symptom,
        advice: advice
    })
};

exports.gettip = function (req, res) {
    res.render('tip');
}

exports.createtip = function (req, res) {
    var tip = new Tip(req.body);
    tip.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.redirect('/nurse')
        }
    });      
};



