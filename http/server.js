const http = require('http');
const fs = require('fs');

const PORT = 8080;

http.createServer(function (req, res) {

	console.log('req.headers object -> ', req.headers);

  fs.readFile(__dirname + '/index.html', function (err,data) {

    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
	});

}).listen(PORT, () => console.log(`Server listen on ${PORT}`));