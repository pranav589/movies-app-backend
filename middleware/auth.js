const { User } = require("../models/User");

let auth = (req, res, next) => {
  let token = req.cookies;
  User.findByToken(token, (err, user) => {
    console.log(token);
    if (err) throw err;

    console.log(user);
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
