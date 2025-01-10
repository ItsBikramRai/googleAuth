import jwt from "jsonwebtoken";

export const verifyTokenMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  try {
    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token",
      });
    }

    // Attach userId to request object
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);

    // Differentiate between token-related and server errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Token verification failed",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Token has expired",
      });
    }

    // Catch-all for unexpected errors
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

