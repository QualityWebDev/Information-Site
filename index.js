const http = require('http');
const url = require('url');
const fs = require('fs');

const PORT = 8080;

http.createServer( (req, res) => {
  const q = url.parse(req.url, true);
  const filename = req.url === "/" ? "./index.html" : `.${q.pathname}.html`;
  const notFound = './404.html';
  fs.readFile(filename, (err, data) => {
    if (err) {
        fs.readFile(notFound, (err404, data404) => {
            if (err404){
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write('500: Internal Server Error.');
                return res.end();
            } if (data404){
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(data404);
                return res.end();
            }
        });
    } else {
        if (data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }
    }
  });
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});