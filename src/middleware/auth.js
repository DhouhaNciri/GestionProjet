let jwt = require("jsonwebtoken");

let Authentication = {
  authUser: async (req, res, next) => {
    try {
      let token = req.header("Authorization");
      if (!token)
        return res.status(400).json({ msg: "Invalid Authentication" });

      jwt.verify(token, process.env.Access_Token, (err, user) => {
        if (err) return res.status(400).json({ msg: "Invalid Authentication" });
        req.user = user;
        next();
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = Authentication;
