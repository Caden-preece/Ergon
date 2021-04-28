const business = require("../models/business");
const service = require("../models/services")
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
      res.render("services/electrical");
    },
    indexViewmechanic: (req, res) => {
        res.render("services/mechanics");
      },
      indexViewplumbing: (req, res) => {
        res.render("services/plumbing");
      },
      indexViewtransportation: (req, res) => {
        res.render("services/transportation");
      },

    getServices: (req, res, next) => {
      service.find({})
        .then(services => {
          res.locals.services = services;
          next();
        })
        .catch(error => {
          console.log(`Error fetching services: ${error.message}`);
          next(error);
        });
    },

  }
  


