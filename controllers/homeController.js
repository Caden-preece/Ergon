
//***** ROUTES ********
// Routes that show before Login
// Index, about, services, Login/Signup
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
    res.render("login");
  }
exports.signUpPage = (req, res) => {
  res.render("loginSignUp");
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