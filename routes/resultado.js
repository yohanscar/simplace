var express = require('express');
var router = express.Router();
var GooglePlaces = require('google-places');
var places = new GooglePlaces('AIzaSyCLhCkdf41GbETGwM0VIMy2k_b65Tegm0k'); // chave da api google places
var _cep;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(req.query.cep);
  _cep = req.query.cep;

places.autocomplete({input: _cep}, function(err, response) {
  console.log("autocomplete: ", response.predictions);
  console.log("resposta id>>>",response["id"]);

  car_repair type
  place_id

});
});
module.exports = router;
