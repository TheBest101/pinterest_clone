var path = process.cwd()
var ServerHandler = require(path + '/app/controllers/ServerHandler.js')
module.exports = function (app, passport) {

  function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
      res.redirect('/nonuser')
		}
	}
  var serverHandler = new ServerHandler();
  //view system
  app.route('/')
    .get(isLoggedIn, (req,res) => {
      res.sendFile(`${path}/public/home.html`)
    })

  app.route('/your')
    .get(isLoggedIn, (req,res) => {
      res.sendFile(`${path}/public/your.html`)
    })

  app.route('/create')
    .get(isLoggedIn, (req, res) => {
      res.sendFile(`${path}/public/create.html`)
    })
  //nonuser
  app.route('/nonuser')
    .get((req,res) => {
      res.sendFile(`${path}/public/nonuser.html`)
    })


  //api system + serverHandler
  app.route('/api/getLinks')
    .get(serverHandler.getLinks)

  app.route('/api/deleteLink')
    .get(isLoggedIn, serverHandler.deleteLink)

  app.route('/api/getUserLinks')
    .get(isLoggedIn, serverHandler.getUserLinks)

  app.route('/api/createLink')
    .get(isLoggedIn, serverHandler.createLink)

  //login system
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/',
        failureRedirect : '/'
    }));
};
