var express = require('express');
var router = express.Router();
var GooglePlaces = require('google-places');
var places = new GooglePlaces('AIzaSyCLhCkdf41GbETGwM0VIMy2k_b65Tegm0k'); // chave da api google places
var _cep;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(req.query.cep);

    places.search({keyword: _cep }, function(err, response) {
    console.log("search: ", response.results);

    places.details({reference: response.results[0].reference}, function(err, response) {
      console.log("search details: ", response.result.website);
      // search details:  http://www.vermonster.com/
    });
  });
});

places.autocomplete({input: 'Verm', types: "(cities)"}, function(err, response) {
  console.log("autocomplete: ", response.predictions);

  var success = function(err, response) {
    console.log("did you mean: ", response.result.name);
    // did you mean:  Vermont
    // did you mean:  Vermont South
    // did you mean:  Vermilion
    // did you mean:  Vermillion
  };

  for(var index in response.predictions) {
    places.details({reference: response.predictions[index].reference}, success);
  }
});

module.exports = router;
