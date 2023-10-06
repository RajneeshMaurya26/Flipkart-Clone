import jwt from "jsonwebtoken";
export const requireSignin = (req, res, next) => {
    try {
        if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token,process.env.JWT_SECRET);
        req.user = user;
        }
        else{
            return res.status(500).json({ message: 'Unauthorized: Authorization required'})
        }
       
        next();
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
}

export const userMiddleware = (req, res, next) => {
    try {
        if(req.user.role != 'user'){
            return res.status(500).json({message:'Access denied'});
        }
        next();
    } catch (error) {
        return res.status(500).json({message:'Something went worng'});
    }
}
export const adminMiddleware = (req, res, next) => {
    try {
        if(req.user.role != 'admin'){
            return res.status(500).json({message:'Access denied'});
        }
        next();
    } catch (error) {
        return res.status(500).json({message:'Something went worng'});
    }
}