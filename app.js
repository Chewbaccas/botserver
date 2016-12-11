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
	server.use(restify.acceptParser(server.acceptable));
	server.use(restify.queryParser());
	server.use(restify.bodyParser());
	/*server.use(function crossOrigin(req,res,next){
	    res.header("Access-Control-Allow-Origin", "localhost");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods", "GET, POST");
	    return next();
	});*/
	restify.CORS.ALLOW_HEADERS.push('Accept');
	restify.CORS.ALLOW_HEADERS.push('Sid');
	restify.CORS.ALLOW_HEADERS.push('Lang');
	restify.CORS.ALLOW_HEADERS.push('Origin');
	restify.CORS.ALLOW_HEADERS.push('withcredentials');
	restify.CORS.ALLOW_HEADERS.push('X-Requested-With');
	restify.CORS.ALLOW_HEADERS.push('Authorization');
	restify.CORS.ALLOW_HEADERS.push('Accept-Encoding');
	restify.CORS.ALLOW_HEADERS.push('Accept-Language');
	//server.use(restify.CORS());
	//server.use(restify.fullResponse());
	 
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