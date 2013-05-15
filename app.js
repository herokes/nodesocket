var http = require("http");
var a = '';
	http.createServer(function(request, response){
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello world");
		response.end();
}).listen(3000);
debugger;
a = 'www';
console.log("Server has started.");
