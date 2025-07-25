import bcrypt from "bcryptjs";
import User from "../model/auth.model.js";
import { generateToken , generateTokenAdmin } from "../generateToken.js";


export const signup = async(req, res) =>{
    const { username , fullname , email, password  } = req.body;
     
    if( !username || !fullname || !email || !password ){
        res.status(400).json({ message: "Please fill all the fields" });
        return;
    }
    if(password.length < 6){
        res.status(400).json({ message: "Password should be at least 6 characters long" });
        return;
    }
    if(!email.includes("@") || !email.includes(".com")){
        res.status(400).json({ message: "Please enter a valid email address" });
        return;
    }
    const existingUser = await User.findOne({ email });
    const existingEmail = await User.findOne({ email });
    if(existingUser){
        res.status(400).json({ message: "User already exists" });
        return;
    }
    if(existingEmail){
        res.status(400).json({ message: "Email already exists" });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username , fullname , email, password: hashedPassword });
    await user.save();
    const token = generateToken(user._id);
    res.status(200).json({ token, message: "User registered successfully" , user });
}
export const Login = async(req , res) =>{
    const { username , password } = req.body;
    if(!username || ! password ) {
        res.status(400).json({ message: "Please fill all the fields" });
        return;
    }
    const user = await User.findOne({ username });
    if(!user){
        res.status(400).json({ message: "User not found" });
        return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        res.status(400).json({ message: "Incorrect password" });
        return;
    }
    const token = generateToken(user._id);
    res.status(200).json({ token , message: "Login successful" , user });
}
export const getUser = async(req , res) =>{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json(user);
}
export const logout = async(req , res) =>{ 
    res.status(200).json({ message: "Logout successful" });
}
export const AdminLogin = async(req , res) =>{
    const { username , password } = req.body;
    if(!username || !password ) {
        res.status(400).json({ message: "Please fill all the fields" });
        return;
    }
 if (
  username !== process.env.ADMIN_USERNAME ||
  password !== process.env.ADMIN_PASSWORD
) {
  return res.status(400).json({ message: "Incorrect username or password" });
}

    const token = generateTokenAdmin();
    res.status(200).json({ token , message: "Login successful" });
}
export const getAdmin = async (req, res) => {
  try {
    const admin = req.admin;
    if (admin) {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        admin,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No admin found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
  

};