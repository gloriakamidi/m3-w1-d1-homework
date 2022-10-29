var http = require('http'); // Import Node.js core module

var hostname ='localhost';
var port = '8000'

var server= http.createServer(function (req, res) { // create web server
// handle incoming requests here
   if (req.url == '/') { //check the url of current request

    // set response header
    res.writeHead(200, {'Content-Type': 'text/html'}); // 200 is the status code indicating that the request has succeeded

    //set response content 
    res.write('<html><body><h1>Home Page.</h1></body></html>');
    res.end();

   //response for About Page
   } else if (req.url == "/about") {

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<html><body><h1>About Page.</h1></body></html>');
    res.end();

    //response for Contact Page
   }else if (req.url == "/contact") {

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<html><body><h1>Contact Page.</h1></body></html>');
    res.end();

   } else 
        res.end('Invalid Request!');
});

server.listen(port); // listen for any incoming requests
console.log(`The NodeJS server on port ${port} is now running...`)
