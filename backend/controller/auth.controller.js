import bcrypt from "bcryptjs";
import User from "../model/auth.model.js";
import Admin from "../model/admin.model.js";
import { generateToken, generateTokenAdmin } from "../generateToken.js";


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
    res.status(200).json({ user, message: "Login successful", success : true });
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

    // 1. Check Super Admin credentials (.env)
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const payload = {
        role: "superadmin",
        username: "superadmin",
        fullname: "Super Admin",
        permissions: {
          addProduct: true,
          listProducts: true,
          orderManagement: true,
        },
      };
      const token = generateTokenAdmin(payload);
      return res.status(200).json({
        token,
        message: "Super Admin Login successful",
        admin: payload,
      });
    }

    // 2. Check Database for Manager / Sub-Admin
    try {
      const staff = await Admin.findOne({
        $or: [{ username: username }, { email: username.toLowerCase() }],
      });

      if (!staff) {
        return res.status(400).json({ message: "Incorrect username or password" });
      }

      if (!staff.isActive) {
        return res.status(403).json({
          message: "Your account is deactivated. Please contact Super Admin.",
        });
      }

      const isMatch = await bcrypt.compare(password, staff.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect username or password" });
      }

      const payload = {
        id: staff._id,
        username: staff.username,
        fullname: staff.fullname,
        role: staff.role,
        permissions: staff.permissions,
      };

      const token = generateTokenAdmin(payload);
      return res.status(200).json({
        token,
        message: "Login successful",
        admin: payload,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error during login", error: error.message });
    }
}

export const getAdmin = async (req, res) => {
  try {
    const admin = req.admin;
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No admin found",
      });
    }

    // If Super Admin
    if (admin.role === "superadmin" || (admin.role === "admin" && !admin.id)) {
      return res.status(200).json({
        success: true,
        message: "Login verified",
        admin: {
          role: "superadmin",
          username: "superadmin",
          fullname: "Super Admin",
          permissions: {
            addProduct: true,
            listProducts: true,
            orderManagement: true,
          },
        },
      });
    }

    // If Sub-admin / Manager from database
    const staff = await Admin.findById(admin.id).select("-password");
    if (!staff || !staff.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account inactive or not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login verified",
      admin: {
        id: staff._id,
        username: staff.username,
        fullname: staff.fullname,
        email: staff.email,
        role: staff.role,
        permissions: staff.permissions,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Staff / Manager Management Controllers (Super Admin only)
export const getAllStaff = async (req, res) => {
  try {
    const staffList = await Admin.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, staff: staffList });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch staff list", error: error.message });
  }
};

export const createStaff = async (req, res) => {
  try {
    const { username, fullname, email, password, role, permissions } = req.body;

    if (!username || !fullname || !email || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingStaff = await Admin.findOne({
      $or: [{ username }, { email: email.toLowerCase() }],
    });

    if (existingStaff) {
      return res.status(400).json({ message: "Username or Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStaff = new Admin({
      username,
      fullname,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "manager",
      permissions: {
        addProduct: !!permissions?.addProduct,
        listProducts: !!permissions?.listProducts,
        orderManagement: !!permissions?.orderManagement,
      },
      isActive: true,
    });

    await newStaff.save();

    const createdStaff = newStaff.toObject();
    delete createdStaff.password;

    res.status(201).json({
      success: true,
      message: `${role === "admin" ? "Admin" : "Manager"} created successfully`,
      staff: createdStaff,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create staff member", error: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, role, permissions, isActive, password } = req.body;

    const staff = await Admin.findById(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    if (fullname) staff.fullname = fullname;
    if (email) staff.email = email.toLowerCase();
    if (role) staff.role = role;
    if (typeof isActive === "boolean") staff.isActive = isActive;

    if (permissions) {
      staff.permissions = {
        addProduct: permissions.addProduct !== undefined ? permissions.addProduct : staff.permissions.addProduct,
        listProducts: permissions.listProducts !== undefined ? permissions.listProducts : staff.permissions.listProducts,
        orderManagement: permissions.orderManagement !== undefined ? permissions.orderManagement : staff.permissions.orderManagement,
      };
    }

    if (password && password.trim().length >= 6) {
      const salt = await bcrypt.genSalt(10);
      staff.password = await bcrypt.hash(password, salt);
    }

    await staff.save();

    const updated = staff.toObject();
    delete updated.password;

    res.status(200).json({
      success: true,
      message: "Staff member updated successfully",
      staff: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update staff member", error: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Admin.findByIdAndDelete(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json({ success: true, message: "Staff member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete staff member", error: error.message });
  }
};