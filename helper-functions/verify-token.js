import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  let auth = req.headers.authorization;
  let token = auth.split(" ")[1];

  if (token) {
    jwt.verify(token, "my-secrete-key", (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token", token: token });
      } else {
        req.tokenData = decodedToken;
        console.log("Token varified")
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "Token is missing" });
  }
}

export { verifyToken };
