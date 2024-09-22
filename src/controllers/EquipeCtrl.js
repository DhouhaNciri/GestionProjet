let equipes = require("../models/EquipeModel");

let EquipeCtrl = {
  createEquipe: async (req, res) => {
    try {
      let { nom, membres } = req.body;

      let findEquipe = await equipes.findOne({ nom });
      if (findEquipe) return res.status(400).jso({ msg: "equipe déja existe" });

      let newEquipe = new equipes({ nom, membres });
      await newEquipe.save();

      res.json({ result: newEquipe });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAllEquipe: async (req, res) => {
    try {
      let findEquipes = await equipes.find().populate("membres","-password");
      res.json({ result: findEquipes });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getEquipeById: async (req, res) => {
    try {
      let findEquipe = await equipes
        .findById({ _id: req.params.id })
        .populate("membres","-password");
      res.json({ result: findEquipe });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateEquipe: async (req, res) => {
    try {
      let { nom, membres } = req.body;
      let updateEquipe = await equipes.findOne();
    } catch (error) {}
  },
};

module.exports = EquipeCtrl;
