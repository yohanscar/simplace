var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var GooglePlaces = require('google-places');
var places = new GooglePlaces('AIzaSyCLhCkdf41GbETGwM0VIMy2k_b65Tegm0k'); // chave da api google places
 
var GooglePlacesClient = require('@google/maps').createClient({
  key: 'AIzaSyCLhCkdf41GbETGwM0VIMy2k_b65Tegm0k'
});

var _cep;
var G_endereco;
var sOficinas = "Oficinas em ";
var aux_endereco;
var coordenadas = "[{position: new google.maps.LatLng(-33.91721, 151.22630),type: 'info'      }, {      position: new google.maps.LatLng(-33.91539, 151.22820),      type: 'info'      }, {      position: new google.maps.LatLng(-33.91747, 151.22912),      type: 'info'      }, {      position: new google.maps.LatLng(-33.91910, 151.22907),      type: 'info'      }, {      position: new google.maps.LatLng(-33.91725, 151.23011),      type: 'info'      }, {      position: new google.maps.LatLng(-33.91872, 151.23089),      type: 'info'      }, {      position: new google.maps.LatLng(-33.91784, 151.23094),      type: 'info'     }, {      position: new google.maps.LatLng(-33.91682, 151.23149),      type: 'info'      }, {      position: new google.maps.LatLng(-33.91790, 151.23463),      type: 'info'      }, {      position: new google.maps.LatLng(-33.91666, 151.23468),      type: 'info'      }, {      position: new google.maps.LatLng(-33.916988, 151.233640),      type: 'info'      }, {      position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),      type: 'parking'      }, {      position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),      type: 'parking'      }, {      position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),      type: 'parking'      }, {      position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),      type: 'parking'      }, {      position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),      type: 'parking'      }, {      position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),      type: 'parking'      }, {      position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),      type: 'parking'      }, {      position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),      type: 'library'      }      ];"
var _rating;


/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send(req.query.cep); 
  _cep = req.query.cep;
  _rating = req.query.rating;

GooglePlacesClient.geocode({
  address: _cep
}, function(err, response) {
  if (!err) {
             console.log("rating entrada>>>", _rating)
             console.log(response.json.results[0].address_components);
             console.log(response.json.results[0].geometry);  // mostra valores do cep
             G_endereco = response.json.results[0].formatted_address;   
    	     GooglePlacesClient.places({
                   query: sOficinas + G_endereco // oficinas em <endereco google>
             }, function(err, response) {
                if (!err) {
                        console.log(response.json.results[0].formatted_address );  // mostra valores [0].formatted_address)
                        console.log(response.json.results[1].formatted_address );
                        aux_endereco = response.json.results[0].formatted_address;
                        aux_place_id = response.json.results[0].place_id

                        places.details({placeid: aux_place_id}, function(err, response) {
                            if(err) { console.log(err); return; }
                             console.log("search details: ", response.result.geometry.location);
                               res.send("<h1>teste</h1> <h2>teste</h2>");
                            // res.send(response.result.geometry.location);
                            // res.render('resultado', { title: 'Simplaces | As melhores oficinas' , codigo: _cep  });
                             });
                }
             })
  }
});

/*
places.autocomplete({input: _cep}, function(err, response) {
  console.log("autocomplete: ", response.predictions);
  console.log("resposta id>>>",response["id"]);

  car_repair type
  place_id  

}); */


//ENVIA TELA


});
module.exports = router;
