const path = require('path');
const dataMapper = require('../dataMapper');

const mainController = {

  // méthode pour la page d'accueil
  homePage: (req, res, next) => {
    dataMapper.getAllFigurines((figurines) => {
      if (!figurines) {
        next();
      } else {
        res.render("accueil", {figurines});
      };
    });
  },

  // méthode pour la page article
  articlePage: (req, res, next) => {
    const id = Number(req.params.id);
    dataMapper.getOneFigurine(id, figurine => {
      if (!figurine) {
        next();
      } else {
        res.render("article", {figurine});
      }
    });
  },
}


module.exports = mainController;