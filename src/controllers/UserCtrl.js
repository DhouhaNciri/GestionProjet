let Users = require("../models/UserModel");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

let UserCtrl = {
  login: async (req, res) => {
    try {
      let { email, password } = req.body;

      let finduser = await Users.findOne({ email });
      if (!finduser) return res.status(400).json({ msg: "email incorrect" });

      let isMatch = await bcrypt.compare(password, finduser.password);
      if (!isMatch)
        return res.status(400).json({ msg: "mot de passe incorrect" });

      let accessToken = createAccesstoken({ id: finduser._id });
      res.json({ user: finduser, accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  inscrit: async (req, res) => {
    try {
      let { nom, prenom, email, password, telephone, image, role } = req.body;
      let findUser = await Users.findOne({ email });
      if (findUser) return res.status(400).json({ msg: "user déja existe" });

      let passwordHash = await bcrypt.hash(password, 10);

      let newUser = new Users({
        nom,
        prenom,
        email,
        password: passwordHash,
        telephone,
        image: "/api/upload/photo_profil/" + image,
        role,
      });
      await newUser.save();
      res.json({ result: newUser });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  findUser: async (req, res) => {
    try {
      let findUser = await Users.findById({ _id: req.params.id }).select(
        "-password"
      );
      res.json({ result: findUser });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      let findUsers = await Users.find({ role: { $ne: "Admin" } });

      res.json({ result: findUsers });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  UpdateUser: async (req, res) => {
    try {
      let { nom, prenom, email, telephone, image, role } = req.body;

      let UpdateUser = await Users.findByIdAndUpdate(
        { _id: req.params.id },
        {
          nom,
          prenom,
          email,
          telephone,
          image,
          role,
        }
      );
      res.json({ result: UpdateUser });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  DeleteUser: async (req, res) => {
    try {
      await Users.findByIdAndDelete({ _id: req.params.id });

      res.json({ result: "user delete " });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
let createAccesstoken = (user) => {
  return jwt.sign(user, process.env.Access_Token, { expiresIn: "1d" });
};

module.exports = UserCtrl;
