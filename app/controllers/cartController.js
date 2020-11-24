const path = require('path');

const cartController = {

  // méthode pour afficher le panier
  cartPage: (req, res) => {
    res.render('panier');
  },

  cartAdd: (req, res, next) => {
    if (!req.body) {
      req.session.cart = req.body.cart
    } 
    if (!figurine) {
      dataMapper.getOneFigurine(id, quantity, (figurine) => {
        req.session.cart.push(figurine)
      })
    } else {
      quantity ++
    }
    res.redirect('/cart');
    },
  }


module.exports = cartController;