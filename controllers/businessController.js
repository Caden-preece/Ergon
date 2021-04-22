const User = require("../models/user"),
Business = require("../models/business"),

getBusinessParams = body => {
    return {
      email: body.email,
      companyName: body.companyName,
      city: body.city,
      state: body.state,
      zipCode: body.zipCode,
      service: body.service
        
    }
};


module.exports = {

getCreatePage: 
    (req, res) => {
        res.render("users/createBusinessProfile");
        },


showUser: (req, res, next) => {
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

  showBusiness: (req, res, next) => {
    let businessId = req.user.businessProfileId;
    Business.findById(businessId)
    .then(business => {
      res.locals.business = business;
      next();
    })
    .catch(error => {
      console.log("business id error:");
      next(error);
    });
  },

  showView: (req, res) => {
    res.render("/users/createBusinessProfile");
  },

  create: (req, res, next) => {
    Business.create(req.body).then((result) => {
        console.log(result);
        User.findByIdAndUpdate(req.user._id,{businessProfileId:result._id}).then();
        next();
    }).catch((err) => {
        next(err);
    });
},

madeBusinessProfile: (req, res, next) => {
  let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        currentUser.hasBusinessProfile = true;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });

}
  
  // (req, res, next) => {

  //   if (req.skip) next();
  //   let newBusiness = new Business(getBusinessParams(req.body));
  //   Business.create(newBusiness, (e, business) => {
  //     if (business) {
  //       //req.flash("success", `${user.firstName}'s account created successfully!`);
  //       res.locals.redirect = "profile";
  //       next();
  //     } else {
  //       //req.flash("error", `Failed to create user account because: ${e.message}.`);
  //       res.locals.redirect = "/users/createBusinessProfile/<%=user._id%> ";
  //       next();
  //     }
  //   });
  // },

  
}
//currentUser.businessProfileId.populate()
//mongoose
//currentUser.businessProfileId.populate it's a mongoose method


