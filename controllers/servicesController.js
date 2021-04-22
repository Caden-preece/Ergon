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
  
    indexView: (req, res) => {
      res.render("services/construction");
    }
}