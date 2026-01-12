import { apiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user,model";

const registerUser = asyncHandler(async (req, res) => {
    const { username , email , password , firstname , lastname } = req.body;

    if (!username.trim() ) {
        throw new apiError(444 , "Please Enter username")
    }
    
    if (!email.trim() ) {
        throw new apiError(444 , "Please Enter email")
    }

    if (password.length < 6) {
        throw new apiError(444 , "Make your password strong with min 6 character")
    }

    const existedEmail = await User.findOne(email);
    if (existedEmail) {
        throw new apiError(402 , "User is already exists please change your email")
    }

    const existedUsername = await User.findOne(username);
    if (existedUsername) {
        throw new apiError(402 , "User is already exists please change your username")
    }

    const registerUser = await User.create({ username, email, password, firstname, lastname });

    const createdUser = await User.findById(registerUser._id).select(
        "-passwoed -__v -createdAt -updatedAt -refreshToken"
    )

    if (!createdUser) {
        throw new apiError(500 , "User registration failed on registeration");
    }

    return res.status(201).json(
        new apiResponse(201 , createdUser , "User registered successfully")
    )
})

export {registerUser};