export default function (req, res, next) {
    if (req.cookies.token) {
        res.redirect('/')
        req.flash("HomeInfo", "Are you sure why you want to enter the site")
        return
    }
    
    next()
}