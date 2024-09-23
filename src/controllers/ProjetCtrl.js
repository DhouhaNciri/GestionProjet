let projet = require("../models/ProjetModel");
let user = require("../models/UserModel");
let equipe = require("../models/EquipeModel");
let ProjetCtrl = {
  CreateProjet: async (req, res) => {
    try {
      let { nom, description, dateDebut, dateFin, budget, document, equipe } =
        req.body;

      let UrlDocument = "";
      if (document) {
        UrlDocument = "/api/upload/document" + document;
      } else {
        UrlDocument = "";
      }
      let newProjet = new projet({
        nom,
        description,
        dateDebut,
        dateFin,
        budget,
        document: UrlDocument,
        equipe,
      });
      await newProjet.save();
      res.json({ result: newProjet });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllProject: async (req, res) => {
    try {
      let findProjets = await projet.find().populate({
        path: "equipe",
        populate: { path: "membres", select: "-password" },
      });
      res.json({ result: findProjets });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getProjetById: async (req, res) => {
    try {
      let findProjet = await projet.findById({ _id: req.params.id }).populate({
        path: "equipe",
        populate: { path: "membres", select: "-password" },
      });
      res.json({ result: findProjet });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  UpdateProjet: async (req, res) => {
    try {
      let { nom, description, dateDebut, dateFin, budget, document, equipe } =
        req.body;

      let UpdateProjet = await projet.findByIdAndUpdate(
        { _id: req.params.id },
        {
          nom,
          description,
          dateDebut,
          dateFin,
          budget,
          document,
          equipe,
        }
      );
      res.json({ result: UpdateProjet });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  DeleteProjet: async (req, res) => {
    try {
      await projet.findByIdAndDelete({ _id: req.params.id });

      res.json({ result: "projet delete " });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getprojetByChef: async (req, res) => {
    try {
      let findUser = await user.findById(req.user.id);
      // houni bech njibou user w ba3ed nlawjou user fe equipe kif nal9ou equipe haki njibou les projets elli tab3ib equipe hak, 5alih l commaintaire
      let findProjet = await projet.find().populate({
        path: "equipe",
        match: { membres: findUser._id },
        populate: { path: "membres" },
      });
      findProjet = findProjet.filter((projet) => projet.equipe);
      res.json({ result: findProjet });
    } catch (error) {}
  },
};

module.exports = ProjetCtrl;
