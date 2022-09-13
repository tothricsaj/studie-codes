const http = require('http');
const fs = require('fs');

const PORT = 8080;

http.createServer(function (req, res) {

	// console.log('req.headers object -> ', req.headers);
	// console.log('req.url -> ', req.url);
	// console.log('req.method -> ', req.method);
	// console.log('req.body -> ', req.body);

	// res.setHeader('Cache-Control', 'max-age=31536000');
	// res.write('hello world')
	// res.end();

  fs.readFile(__dirname + req.url, function (err,data) {

		const requestContentType = req.headers['accept'].split(',')[0];

    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }

		if(requestContentType === 'text/css') {
			res.setHeader('Cache-Control', 'max-age=604800, private')
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