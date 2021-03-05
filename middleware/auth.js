const jwt = require("jsonwebtoken") ;

const secret = process.env.ACCESS_SECRET;

const auth = async (req, res, next) => {
  const token = req.cookies.token
  
  if (!token) return res.status(401).send("No access.. No token.")
  
    try {
      const data = jwt.verify(token, secret);
      req.userId = data.id;    
      next();
    } catch (error) {
      res.clearCookie("token")
      res.status(401).json(error.message)
    }
};

module.exports = auth;