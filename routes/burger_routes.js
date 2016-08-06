var express = require('express');
var router = express.Router();
var db = require('../models');
var sequelConnect = db.sequelize;

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	db.Burger.findAll({

	}).then(function (data) {
		data.forEach(function(burg) {
			db.Ingredient.find({where: {BurgerId: burg.id}}).then(function(ing) {
				burg.ing = ing.name;
			})
		})
		res.render('index', {burgers: data, message: req.flash()});
	});
});

router.post('/burgers/create', function(req, res) {
	db.Burger.findOne({where: {burger_name: req.body.name}}).then(function(burger) {
		if(!burger) {
			var aBurger;
			db.Burger.create({ burger_name: req.body.name, Ingredient: { name: req.body.ing_name } }, { include: [db.Ingredient]})
			.then(function(burger) {
				aBurger = burger;
			})
			.then(function() {
				req.flash('success', 'Your ' + req.body.name + ' with ' + req.body.ing_name + ' is ready to be devoured!');
				res.redirect('/burgers');
			});				
		} else {
			req.flash('failure', 'That burger has already been made');
			res.redirect('/burgers');
		}
	})
});

router.put('/burgers/update/devour/:id', function(req, res) {
	db.Burger.update(
		{ 
			devoured: true
		}, 
		{
			where: {
				id: req.params.id 
			}
		}).then(function() {
		req.flash('devour', 'You devoured that thing!');
		res.redirect('/burgers');
	});
});

router.delete('/burgers/delete/:id', function(req, res) {
	db.Burger.destroy(
		{
			where: {
				id: req.params.id
			}
		}).then(function() {
		req.flash('delete', 'Burger has been deleted');
		res.redirect('/burgers');
	});
});

router.put('/burgers/update/reorder/:id', function(req, res) {
	db.Burger.update(
		{
			devoured: false
		},
		{
			where: {
				id: req.params.id
			}
		}).then(function() {
		req.flash('reorder', 'We made it again for you!');
		res.redirect('/burgers');
	});
});

router.use(function (req, res){
	res.redirect('/burgers');
})

module.exports = router;