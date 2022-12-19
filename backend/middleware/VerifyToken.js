import jwt from "jsonwebtoken";

export const VerifyToken = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json("Plz Log In");
  }

  const info = jwt.decode(token, process.env.JWTS);

  req.id = info.id;

  next();
};
