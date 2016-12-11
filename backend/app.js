/**
 * The Code Force Hackathon Prototype
 *
 * Created by: TheCoffeeForce Team
 * Last Modified: 11/12/2016
 */
(function(restify, bot){

	var server = restify.createServer({
	  name: 'botapp',
	  version: '1.0.0'
	});
	server.use(restify.queryParser());
	server.use(restify.bodyParser());
	 
	// main
	server.post('/chat/', function (req, res, next) {
		return handleRequest(req, res, next);
	});

	// adhoc
	server.get('/chat/adhoc/:question', function (req, res, next) {
		return handleRequest(req, res, next);
	});

	// start server
	server.listen(8080, function () {
	  console.log('%s listening at %s', server.name, server.url);
	});

	function handleRequest(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
		res.setHeader('Access-Control-Allow-Methods', '*');
		res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
		res.setHeader('Access-Control-Max-Age', '1000');
		console.log(res);
		var answerText = bot.handle(req.params.question);
		console.log(answerText);
	  	res.send(new Answer(answerText));
	  	return next();
	}

	function Answer(text) {
		this.answer = text;
	}

})(require('restify'), require('./bot'));