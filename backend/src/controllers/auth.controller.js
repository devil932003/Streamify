import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { upsertSreamUser } from '../lib/stream.js';
export async function signup(req, res) {
  const { email, password, fullName } = req.body;
  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    const newUser = await User.create({ 
      email,
      password,
      fullName,
      profilePic: randomAvatar
    });

   try{
 await upsertSreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
    });
    console.log(`Stream User created for ${newUser.fullName}`);
   }catch(error){
     console.error("Error occurred while creating user in Stream:", error);

   }

    const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      samesite:"strict"
    });

    res.status(201).json({ success: true, user: newUser}); 
  } catch (error) {
    console.error("Error occurred during signup:", error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req, res) {
 try{
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        samesite: "strict"
    });
    res.status(200).json({ success: true, user });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
     }
}

export function logout(req, res) {
  res.clearCookie('jwt');
  res.status(200).json({ message: "Logged out successfully" });
}

export async function onboarding(req, res) {
    try{
      const userId = req.user._id;

      const {fullName,bio,nativeLanguage,learningLanguage,location} = req.body;
      if( !fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
          return res.status(400).json({ message: "All fields are required",
            missingFields: [
              !fullName && "fullName",
              !bio && "bio",
              !nativeLanguage && "nativeLanguage",
              !learningLanguage && "learningLanguage",
              !location && "location"
            ].filter(Boolean)
           });
      }
     const updatedUser = await User.findByIdAndUpdate(userId, {
        ...req.body,
        isOnboarded: true
      }, { new: true });
      if(!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

try{
  await upsertSreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
    });
    console.log(`Stream User updated for ${updatedUser.fullName}`);
}catch(streamError){
  console.error("Error occurred during onboarding:", streamError);
}

      res.status(200).json({ message: "User onboarding successful", success: true, user: updatedUser });
    }catch(error){
      console.error("Error occurred during onboarding:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}
