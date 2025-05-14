
const isAdmin = (req, res, next) => {
    if(req.user.role !== 'admin') return res.sendStatus(403).json({message:"Access denied"})
    next();
}


export default isAdmin;