/*
 * Module dependencies
 */
var port = process.env.PORT || 5000;
var express = require('express'),
	stylus = require('stylus'),
	nib = require('nib');
var app = express();
var io = require('socket.io').listen(app);

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
}
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
	{	src: __dirname + '/public',
		compile: compile
	}
));
app.use(express.static(__dirname + '/public'));

//app.get('/', function (req, res) {
//  res.end('Hi there!')
//})
app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
  console.log("ok la");
});


app.listen(port, function() {
  console.log("Listening on " + port);
});


// assuming io is the Socket.IO server object
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection',function(client){
        client.on('messagesent', function(data){
			res = JSON.parse(data);
            console.log('Received expression from client ', res.name + ': '+ res.mes);
            // catch error for bad expression
            try{
				client.emit('messagereceived', res.name + ': '+ res.mes);
				client.broadcast.emit('messagereceived', res.name + ': '+ res.mes);
            }catch(err){
                client.emit("error",err.message);
            }
        });
        client.on('disconnect', function(){
            console.log('Disconnected');
        });
});
