import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "Industry_backend/utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import {User} from "../models/user.models.js" 
import { uploadOnCloudinary } from "../utils/cloudinary.js  ";
import { upload } from "../middlewares/multer.middleware.js";

const registerUser = asyncHandler(async (req, res) => {
  // return res.status(200).json({
  //   message: "Ok",
  // });
  // get user details from frontend
  // validation - not empty
  // check if user already exists : username , email
  // check for images , check for avatar
  // upload from cloudinary, avatar 
  // create user object - create entry in db 
  // remove password and refresh token field from response 
  // check for user creation
  // return 


  const {fullName , email , username , password } = req.body
  console.log("email:" , email);
  // Beginners method
  // if (fullName===""){
  //   throw new ApiError("");
    
  // }
  // Pro method
  if (
    [fullName,email,username,password].some(()=>feild?.trim()==="")
  ) {
    throw new ApiError(400,"all feilds are compulsory");
  }
  
  const existedUser = User.findOne({
    $or:[{username},{email}]
  })

  if(existedUser){
    throw new ApiError(409,"Username already exist")

  }

  const avatarLocalpath = req.files?.avatar[0]?.path;
  const coverImageLocalpath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400,"Avatar file required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalpath)
  await uploadOnCloudinary(coverImageLocalpath)

  if (!avatar) {
    throw new ApiError(400,"Avatar file is required")
  }

  const user = await User.create({
    fullName,
    avatar : avatar.url,
    coverimage : coverImage?.url || "",
    email,
    password,

    username : username.toLocalCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" 
  )

  if (!createdUser) {
    throw new ApiError(500,"Something went wrong with registering a user")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Succesfully")
  )

});

export {
  registerUser,
};