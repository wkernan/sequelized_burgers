var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('req-flash');

var app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
	extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
app.use(session({ 
	resave: false,
	saveUninitialized: true,
	secret: '123' 
}));
app.use(flash());
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	partialsPath: 'views/partials'
}));
app.set('view engine', 'handlebars');

var routes = require('./routes/burger_routes.js');
app.use('/', routes);

app.listen(process.env.PORT || 3000);