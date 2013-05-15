var io = require('socket.io');
 
var socket = io.listen(5555);
socket.sockets.on('connection',function(client){
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