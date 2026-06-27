import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



const generateAccessAndRefreshToken = async(userId){
  try {
    
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken
    const refreshToken = user.generateRefreshToken

    user.refreshToken = refreshToken 
    await user.save({validateBeforeSave: false})

    return {accessToken,refreshToken}

  } catch(error) {
    throw new ApiErrors(500,"Something went wrong while gerating refresh and access token")
  }
}

const loginUser = asyncHandler(async (req, res)=>{

  // req body -> data
  // username or email base access
  // find the user
  // password check
  // access and refresh token
  // send cookie


  const {email, username, password} = req.body

  if(!(username||email)){
    throw new ApiError(400,"username or password is required")
  }

  const user = await  User.findOne({
    $or: [{username},{email}]
  }) 

  if (!user) {
    throw new ApiErrors(404,'user does not exist')
  }

  const isPasswordvalid = await user.isPasswordCorrect(password) 

  if(!isPasswordvalid){
    throw new ApiErrors(404,"Password incorrect")
  }
})



const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists : username , email
  // check for images , check for avatar
  // upload from cloudinary
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response

  // const { fullName, email, username, password } = req.body || {};

    

  //   console.log("req.body:", req.body);
  //   console.log("req.files:", req.files);
  //   console.log("avatar:", req.files?.avatar);
  //   console.log("coverImage:", req.files?.coverImage);
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { fullName, email, username, password } = req.body || {};

    console.log(fullName, email, username, password);

  // Validation
  if (
    [fullName, email, username, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiErrors(400, "All fields are compulsory");
  }

  // Check if user exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiErrors(409, "Username or Email already exists");
  }




  // Files
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiErrors(400, "Avatar file is required");
  }

  // Upload files to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  if (!avatar) {
    throw new ApiErrors(400, "Avatar upload failed");
  }

  // Create user
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

 

  // Fetch created user without sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );


  if (!createdUser) {
    throw new ApiErrors(500, "Something went wrong while registering user");
  }

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User Registered Successfully")
  );

  const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure : true
  }

  return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
    new ApiResponse(
      200,{
        user: loggedInUser, accesToken,refreshToken
      },  
      "User Logged In Successfully"
    )
  )

});

const logout = asyncHandler(async(res,req) => {
  User.find
})


export { registerUser, loginUser };