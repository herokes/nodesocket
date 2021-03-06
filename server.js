var port = process.env.PORT || 5000;
var io = require('socket.io').listen(port, function() {
  console.log("Listening on " + port);
});;

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