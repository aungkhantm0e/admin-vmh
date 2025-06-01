function isAuthenticated(req,res,next){
    if(req.session.user){
        return next();
    }
    res.redirect("/login");
}
function isAdmin(req,res,next){
    if(req.session.user && req.session.user.role==='Admin'){
        return next();
    }
    return res.status(403).send("Access Denied. Admins Only.");
}

module.exports={
    isAuthenticated,
    isAdmin
}
