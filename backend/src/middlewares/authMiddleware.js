
export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({
         success: false,
          message: "Not authenticated" 
        }
    );
  };
  
  export const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "admin") {
      return next();
    }
    res.status(403).json({
         success: false, 
         message: "Access forbidden" 
        }
    );
  };
