var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ParkingSchema   = new Schema({
  photos: [String],
	name: String,
	type: [String],  //[<indoor/outdoor>, <buding/house>]
	rentor: {
	  
	},
	relation: String, //Owned, Leased.
	asking: {
	  price: Number,
	  acceptMultiOffers: Boolean,
	  
	}
	start: Date,
	term: Number, //1~12 months
	available: [],
	
	attachements: [
	  {
	    type: String,
	    name: String,
	    
	  }
	],
	
	address: {
	  streetNo: String,
	  streetName: String,
	  city: String,
	  postCode: String
	},
	loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'      // create the geospatial index
  }
});

module.exports = mongoose.model('Parking', ParkingSchema);