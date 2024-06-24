const jwt = require("jsonwebtoken");


const verifyToken = async (req, res, next)=> {
  const token = req.cookies.token; // Get the token from the cookie

  if (!token) {
    console.log("Please do login to access that page");
    return res.redirect("/login"); // Redirect to login page if token is not present
  }

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY); // Verify the token

    req.userId = decoded.userId; // Store the user ID in the request object
    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.log("Here some error : ", error)
    return res.redirect("/login"); // Redirect to login page if token is invalid
  }
}

module.exports = verifyToken;