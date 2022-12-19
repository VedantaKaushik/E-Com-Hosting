import jwt from "jsonwebtoken";

export const isAdmin = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json("Invalid Request");
  }

  if (token) {
    const User = jwt.decode(token, process.env.JWTS);
    req.user = User.id;
    req.isAdmin = User.admin;
    next();
  }
};
