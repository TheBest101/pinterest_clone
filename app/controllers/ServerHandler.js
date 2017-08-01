var Links = require('../models/links.js')

module.exports = function ServerHandler () {
  this.getLinks = (req, res) => {
    Links
      .find({}, (err, docs) => {
        if(err) {throw err;}
        res.json(docs)
      })
  }
  this.createLink = (req, res) => {
    var link = new Links({
      owner: req.user.twitter.id,
      title: req.query.title,
      link: req.query.link
    })
    link.save((err, doc) => {
      if (err) {throw error;}
      res.json({"Success":true})
    })
  }
  this.deleteLink = (req, res) => {
    Links
      .deleteOne({$and: [{title: req.query.title}, {owner: req.user.twitter.id}]})
      .exec((err, result) => {
        res.json({"Success":true})
      })
  }
  this.getUserLinks = (req, res) => {
    Links
      .find({owner: req.user.twitter.id}, (err, docs) => {
        if(err) {throw err;}
        res.json(docs)
      })
  }
}
