
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
  },
redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next()}

}

exports.saveUser = (req, res, next) => {          
    let newUser = new Users({
      email: req.body.email,
      password: req.body.password,
      accountType: req.body.accountType
    });                                             
    newUser
    .save()
    .then(() => {         
      if (error) res.send(error);
      res.render("users");
    })
    .catch(error => {
        res.send(error);
      });
  };;
 

  