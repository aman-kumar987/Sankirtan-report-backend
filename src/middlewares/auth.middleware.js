import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token) return res.status(401).json({message: "You are not authenticated"})

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        
        if(!decodedToken) return res.status(401).json({message: "Token is not valid"});

        next()
    } catch (error){
        res.status(500).json({message: "Something went wrong can't authenticate user"})
    }
}

export {
    verifyUser
}