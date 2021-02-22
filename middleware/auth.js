const jwt = require("jsonwebtoken") ;

const secret = process.env.ACCESS_SECRET;

const auth = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) 
    return res.status(401).send("No access.. No token.")
  try {
    
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData.sub;
    }
    next();
  } catch (error) {
    res.clearCookie("token")
    res.status(401).json(error.message)
  }
};

module.exports = auth;