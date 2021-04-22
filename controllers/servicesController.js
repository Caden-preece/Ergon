const business = require("../models/business");

module.exports = {
    index: (req, res, next) => {
      business.find({})
        .then(business => {
          res.locals.business = business;
          next();
        })
        .catch(error => {
          console.log(`Error fetching business: ${error.message}`);
          next(error);
        });
    },
  
    indexViewconstruction: (req, res) => {
        res.render("services/construction");
      },
    indexViewelectrician: (req, res) => {
      res.render("services/electrician");
    },
    indexViewmechanic: (req, res) => {
        res.render("services/mechanic");
      },
      indexViewplumbing: (req, res) => {
        res.render("services/plumbing");
      },
      indexViewtransportation: (req, res) => {
        res.render("services/transportation");
      }
}