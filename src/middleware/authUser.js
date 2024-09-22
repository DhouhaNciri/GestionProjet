let users = require("../models/UserModel");

let verifyRole = {
  RoleAdmin: async (req, res, next) => {
    try {
      let user = await users.findOne({ _id: req.user.id });
      if (user.role !== "Admin")
        return res.status(400).json({ msg: "admin resource acces denied" });
      next();
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = verifyRole;
