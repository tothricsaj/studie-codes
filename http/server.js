const http = require('http');
const fs = require('fs');

const PORT = 8080;

http.createServer(function (req, res) {

	console.log('req.headers object -> ', req.headers);
	// console.log('req.url -> ', req.url);
	// console.log('req.method -> ', req.method);
	console.log('req.body -> ', req.body);

	if(req.url === '/api') {
		console.log('req.url -> ', req.url);

		res.content
		res.writeHead(200);
		res.end('Nahát nahát.....');

		return;
	}

  fs.readFile(__dirname + req.url, function (err,data) {

    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200, {
			'Content-Type': 'text/html',
			'Cache-Controll': 'max-age=604800'
		});
    res.end(data);
	});

}).listen(PORT, () => console.log(`Server listen on ${PORT}`));