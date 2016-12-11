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

	function corsHandler(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token');
		res.setHeader('Access-Control-Allow-Methods', '*');
		res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
		res.setHeader('Access-Control-Max-Age', '1000');
		return next();
	}

	function optionsRoute(req, res, next) {
		res.send(200);
		return next();
	}


	server.use(restify.CORS({
		origins: ['http://127.0.0.1', 'http://localhost'],
		credentials: true,
		headers: ['X-Api-Version', 'X-Request-Id', 'X-Response-Time'],
		methods: ['GET','PUT','DELETE','POST','OPTIONS']
	}));


	server.opts('/\.*/', corsHandler, optionsRoute);
	 
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
		var answerText = bot.handle(req.params.question);
	  	res.send(new Answer(answerText));
	  	return next();
	}

	function Answer(text) {
		this.answer = text;
	}

})(require('restify'), require('./bot'));