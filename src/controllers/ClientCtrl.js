let clients = require("../models/ClientModel");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let ClientCtrl = {
  loginClient: async (req, res) => {
    try {
      let { email, password } = req.body;
      let findClient = await clients.findOne({ email });
      if (!findClient) return res.status(400).json({ msg: "email incorrect" });
      let isMatch = await bcrypt.compare(password, findClient.password);
      if (!isMatch)
        return res.status(400).json({ msg: "mot de passe incorrect" });
      let accessToken = createAccesstoken({ id: findClient._id });
      res.json({ user: findClient, accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  inscrit: async (req, res) => {
    try {
      let { nom, prenom, email, password, adresse, telephone, image } =
        req.body;
      let findClient = await clients.findOne({ email });
      if (findClient)
        return res.status(400).json({ msg: "client déja existe" });
      let passwordHash = await bcrypt.hash(password, 10);
      let newClient = new clients({
        nom,
        prenom,
        email,
        adresse,
        password: passwordHash,
        telephone,
        image: "/api/upload/photo_profil/" + image,
      });
      await newClient.save();
      res.json({ result: newClient });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllClient: async (req, res) => {
    try {
      let findClients = await clients.find();
      res.json({ result: findClients });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getClientById: async (req, res) => {
    try {
      let findClient = await clients.findById({ _id: req.params.id });
      res.json({ result: findClient });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

let createAccesstoken = (client) => {
  return jwt.sign(client, process.env.Access_Token, { expiresIn: "1d" });
};

module.exports = ClientCtrl;
