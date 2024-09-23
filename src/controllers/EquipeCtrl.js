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
      let findEquipes = await equipes.find().populate("membres", "-password");
      res.json({ result: findEquipes });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getEquipeById: async (req, res) => {
    try {
      let findEquipe = await equipes
        .findById({ _id: req.params.id })
        .populate("membres", "-password");
      res.json({ result: findEquipe });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateEquipe: async (req, res) => {
    try {
      let { nom, membres } = req.body;
      let findEquipe = await equipes.findById({ _id: req.params.id });

      let arrayEquip = findEquipe.membres;

      // Check if the member already exists (assuming members have unique ids or names)
      if (arrayEquip.some(member => member.toString() === membres)) {
        return res.status(400).json({ msg: "User already exists in this equipe" });
      } else {
        // Add the new member to the team
        arrayEquip.push(membres);
  
        // Update the team in the database
        await equipes.findByIdAndUpdate(
          req.params.id,
          { nom, membres: arrayEquip },
          { new: true }
        );
        
        // Send the updated team members back
        return res.json({ result: arrayEquip });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = EquipeCtrl;
