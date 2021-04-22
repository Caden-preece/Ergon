
//***** ROUTES ********
// Routes that show before Login
// Index, about, services, Login/Signup

//begining of services routes
exports.showconstruction = (req, res) => {
  res.render("./services/construction");
}
exports.showelectrician = (req, res) => {
  res.render("./services/electrician");
}
exports.showmechanic = (req, res) => {
  res.render("./services/mechanic");
}
exports.showplumbing = (req, res) => {
  res.render("./services/plumbing");
}
exports.showtransportation = (req, res) => {
  res.render("./services/transportation")
}
// //ending of services routes



exports.index = (req,res) => {
  res.render("index");
}
exports.about = (req,res) => {
  res.render("about");
}
exports.searchServices = (req,res) => {
  res.render("services");
}
exports.showSignIn = (req, res) => {
    res.render("/signUp/login");
  }
exports.signUpPage = (req, res) => {
  //res.render("loginSignUp");
  res.render("./signUp/signUp");
}
exports.users = (req, res) => {
  res.render("users");
}

exports.showLogin = (req, res) => {
  res.render("./signUp/loginPage");
}

//Routes that show after Login
//Profile, Projects, Invoice, Inbox
exports.showProfile = (req, res) => {
  res.render("profile");
}
exports.showProjects = (req, res) => {
  res.render("myProjects");
}
exports.showInvoices = (req, res) => {
  res.render("invoices");
}
exports.showInbox = (req, res) => {
  res.render("inbox");
}


