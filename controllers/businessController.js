const User = require("../models/user"),
Business = require("../models/business"),
getUserParams = body => {
  return {
    email: body.email,
    password: body.password,
    accountType: body.accountType
  }; 
getBusinessParams = body => {
    return {
        
    }
}
};

module.exports = {

getCreatePage: 
    (req, res) => {
        res.render("users/createBusinessProfile");
        },


show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("/users/createBusinessProfile");
  },
}

