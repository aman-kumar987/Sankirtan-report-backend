import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";

const authenticateUser = asyncHandler(async(req , res, next) => {
    const token = req.cookies("token");

    if(!token){
        throw new ApiError(400, "User is not authenticated");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode){
        throw new ApiError(400, "Try login again");
    }

    req.user = {
        id: decode.id,
        username: decode.username,
        firstName: decode.firstName,
        hostel: decode.hostel,
        email: decode.email,
        role: decode.role,
        isVerified: decode.isVerified
    };
    next();
});

export default authenticateUser;