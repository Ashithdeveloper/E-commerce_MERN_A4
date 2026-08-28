import jwt from "jsonwebtoken";

export const adminMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    const token = auth.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }
};

export const requirePermission = (permissionKey) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Super admins have all permissions
    if (req.admin.role === "superadmin" || req.admin.role === "admin" && !req.admin.permissions) {
      return next();
    }

    // Check specific permission
    if (req.admin.permissions && req.admin.permissions[permissionKey] === true) {
      return next();
    }

    return res.status(403).json({
      message: `Access denied: Missing permission '${permissionKey}'`,
    });
  };
};

export const requireSuperAdmin = (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.admin.role === "superadmin" || (req.admin.role === "admin" && !req.admin.id)) {
    return next();
  }

  return res.status(403).json({
    message: "Access denied: Super Admin privilege required",
  });
};

export default adminMiddleware;