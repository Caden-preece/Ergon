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