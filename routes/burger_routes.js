var express = require('express');
var router = express.Router();
var db = require('../models');
var sequelConnect = db.sequelize;

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	db.burger.findAll({

	}).then(function (data) {
		var queries = [];
		data.forEach(function(burg) {
			queries.push(db.ingredient.find({where: {burgerId: burg.id}}));
		})
		Promise.all(queries).then(function(results) {
				for(var i = 0; i < results.length; i++){
					data[i].ing = results[i].name;
					console.log("my burger:",data[i])
				}
				res.render('index', {burgers: data, message: req.flash()});
		})
	});
});

router.post('/burgers/create', function(req, res) {
	db.burger.findOne({where: {burger_name: req.body.name}}).then(function(burger) {
		if(!burger) {
			var aBurger;
			db.burger.create({ burger_name: req.body.name, ingredient: { name: req.body.ing_name } }, { include: [db.ingredient]})
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
	db.burger.update(
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
	db.burger.destroy(
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
	db.burger.update(
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