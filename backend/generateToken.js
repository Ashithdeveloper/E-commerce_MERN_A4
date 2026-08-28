import jwt from 'jsonwebtoken'

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30days",
  });
};

export const generateTokenAdmin = (payload = { role: "superadmin" }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default { generateToken, generateTokenAdmin };