exports.getabout = (req, res, next) =>{
    res.render('About', {
        isLoggedIn: req.isLoggedIn
    });
};

exports.getcontact =  (req, res, next) =>{
    res.render('Contact', {
        isLoggedIn: req.isLoggedIn
    });
}

exports.getskills = (req, res, next) =>{
    res.render('Skills', {
        isLoggedIn: req.isLoggedIn
    });
}

exports.getproject =  (req, res, next) =>{
    res.render('Project', {
        isLoggedIn: req.isLoggedIn
    });
}