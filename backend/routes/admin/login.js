var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login', {
  layout: 'admin/layout',
});
});
router.post('/', async (req, res, next) => {
  try {
      var usuario = req.body.usuario; //flavia o admin
      var password = req.body.password; //1234 o admin

      console.log(req.body);

      var data = await
          usuariosModel.getUserByUsernameAndPassword(usuario, password);

      if (data != undefined) {
          req.session.usuario = data.usuario;
          req.session.password = data.password;
          res.redirect('/admin/novedades');
      } else {
          res.render('admin/login', {
              layout: 'admin/layout',
              error: true
          });
      }
  } catch (error) {
      console.log(error);
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.render('admin/login', {
      layout: 'admin/layout'
  });
});

module.exports = router;