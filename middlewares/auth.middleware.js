import { ApiErrors } from "../utils/ApiErrors";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jwtwebtoken"

  
  
  export const verifyJWT = asyncHandler(async (req,res,next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")

    if (!token) {
      throw new ApiErrors(401,"Unauthorized request")
    }

    jwt.verify(token,process.env.ACCESSTOKEN)
  })