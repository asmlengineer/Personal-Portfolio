exports.getError = (req, res, next) =>{
    res.render('404', {
        isLoggedIn: req.isLoggedIn
    });
}