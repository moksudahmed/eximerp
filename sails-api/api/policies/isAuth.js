var jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  //var bearerToken;
  var bearerToken= req.headers["x-access-token"];
  
  if (!bearerToken){
		return res.status(403).send({ 
			auth: false, message: 'No token provided.' 
		});
	}
  if (typeof bearerToken !== 'undefined') {    
    //var bearer = bearerHeader.split(" ");
    //bearerToken = bearer[1];
        
   /* if (bearer[0] !== "Bearer") {
      return res.forbidden("bearer not understood");
    }*/

    // on vérifie si le token est bon
    jwt.verify(bearerToken, "votre clé secrète ici", function(err, decoded) {
      if (err) {
        sails.log("verification error", err);
        if (err.name === "TokenExpiredError")
          return res.forbidden("Session timed out, please login again");
        else
          return res.forbidden("Error authenticating, please login again");
      }


      User.findOne(decoded.id).exec(function callback(error, user) {
        if (error) return res.serverError(err);
        if (!user) return res.serverError("User not found");

        req.user = user;
        next();
      });

    });

  } else {
    
    return res.forbidden("No token provided");
  }
};