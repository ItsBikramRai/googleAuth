import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userID) => {
  const token = jwt.sign(
    { id: userID }, 
    process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, //cookie is not accessible via client side script
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //cookie will only be sent in a first-party context
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
  });
};
