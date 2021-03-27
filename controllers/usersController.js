
const Users = require("../models/users"),
getUsersParams = body => {
  return {
    email: body.email,
    password: body.zipCode,
    accountType: body.accountType
  }; 
};

module.exports = {


create: (req, res, next) => {
    let usersParams = getUsersParams(req.body);
    Users.create(usersParams)
      .then(users => {
        res.locals.redirect = "/users";
        res.locals.user = users;
        next();
      })
      .catch(error => {
        console.log(`Error saving subscriber: ${error.message}`);
        next(error);
      });
  }


};