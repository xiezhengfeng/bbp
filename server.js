// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bbp'); // connect to our database
var Parking     = require('./app/models/parking');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'Hey! welcome to our api!' });	
});

// on routes that end in /parkings
// ----------------------------------------------------
router.route('/parkings')

	// create a parking (accessed at POST http://localhost:8080/parkings)
	.post(function(req, res) {
		
		var parking = new Parking();		// create a new instance of the Parking model
		parking.name = req.body.name;  // set the parkings name (comes from the request)

		parking.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Parking created!' });
		});

		
	})

	// get all the parkings (accessed at GET http://localhost:8080/api/parkings)
	.get(function(req, res) {
		Parking.find(function(err, parkings) {
			if (err)
				res.send(err);

			res.json(parkings);
		});
	});

// on routes that end in /parkings/:bear_id
// ----------------------------------------------------
router.route('/parkings/:bear_id')

	// get the parking with that id
	.get(function(req, res) {
		Parking.findById(req.params.bear_id, function(err, parking) {
			if (err)
				res.send(err);
			res.json(parking);
		});
	})

	// update the parking with this id
	.put(function(req, res) {
		Parking.findById(req.params.bear_id, function(err, parking) {

			if (err)
				res.send(err);

			parking.name = req.body.name;
			parking.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Parking updated!' });
			});

		});
	})

	// delete the parking with this id
	.delete(function(req, res) {
		Parking.remove({
			_id: req.params.bear_id
		}, function(err, parking) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
