const http = require('http');
const fs = require('fs');

const PORT = 8080;

http.createServer(function (req, res) {

	// console.log('req.headers object -> ', req.headers);
	// console.log('req.url -> ', req.url);
	// console.log('req.method -> ', req.method);
	// console.log('req.body -> ', req.body);

	if(req.url === '/api') {
		console.log('req.url -> ', req.url);

		res.content
		res.writeHead(200);
		res.end('Nahát nahát.....');

		return;
	}

  fs.readFile(__dirname + req.url, function (err,data) {

		const headerObject = {};

		const requestContentType = req.headers['accept'].split(',')[0];

    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }

		if(requestContentType === 'text/css') {
			res.writeHead(200, {
				'Content-Type': 'text/css',
				'Cache-Controll': 'max-age=604800'
			});
		}

		if(requestContentType === 'text/html') {
			res.writeHead(200, {
				'Content-Type': 'text/html',
				'Cache-Controll': 'no-cache'
			});
		}

		res.end(data);
	});

}).listen(PORT, () => console.log(`Server listen on ${PORT}`));