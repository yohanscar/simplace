var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json()); // for parsing application/json
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Simplaces | As melhores oficinas' });
});

/*POST */
router.post('/', function (req, res) {

    try {
        res.send(req.body)
    } catch (error) {
        res.status(500).send(error)
    }
 })

module.exports = router;
