exports.getHome = (req, res, next) =>{
    res.render('Home', {
        isLoggedIn: req.isLoggedIn
    });
}

exports.getnotes =  (req, res, next) =>{ 
    res.render('Notes', {
        isLoggedIn: req.isLoggedIn
    });
};
