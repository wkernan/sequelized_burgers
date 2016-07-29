var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	db.Burger.findAll({

	}).then(function (data) {
		res.render('index', {burgers: data});
	});
});

router.post('/burgers/create', function(req, res) {
	db.Burger.create({ burger_name: req.body.name }).then(function() {
		res.redirect('/burgers');
	});
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
		res.redirect('/burgers');
	});
});

router.use(function (req, res){
	res.redirect('/burgers');
})

module.exports = router;