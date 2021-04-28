const User = require("../models/user"),
Business = require("../models/business");

module.exports = {

showBiography: (req, res) => {
        res.render("./biography");
    },
showReview: (req, res) => {
    res.render("./review")
},
showChat: (req,res) => {
    res.render("./chat")
}


}


//
