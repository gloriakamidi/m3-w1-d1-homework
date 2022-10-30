var http = require("http"); // Import Node.js core module
var path = require('path');
var fs = require('fs');

var hostname = "localhost";
var port = 8000;

// following class demo approach

var server = http.createServer((req, res) =>{
    console.log(`request for ${req.url} by method ${req.method}`);

    if (req.method === 'GET') {
        var fileUrl = req.url;
        if(fileUrl === '/') {
            fileUrl = '/index.html', '/about.html', '/contact.html'  ; 
        }  // NOTE:I am not sure where to add /about.html /contact.html
        
        var filePath = path.resolve('./' + fileUrl);
        var fileExt = path.extname(filePath);

        if(fileExt === '.html') {
            fs.access(filePath, function(err){
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res);
        }); 
        

        } else {
         res.statusCode = 404;
         res.setHeader('Content-Type', 'text/html');
         res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
    } 
    
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);

    }
   });
   server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
   })
  

/* var server = http.createServer(function (req, res) {
  // create web server
  // handle incoming requests here
  if (req.url == "/") {
    //check the url of current request

    // set response header
    res.writeHead(200, { "Content-Type": "text/html" }); // 200 is the status code indicating that the request has succeeded

    //set response content
    res.write("<html><body><h1>Home Page.</h1></body></html>");
    res.end();

    //response for About Page
  } else if (req.url == "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body><h1>About Page.</h1></body></html>");
    res.end();

    //response for Contact Page
  } else if (req.url == "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body><h1>Contact Page.</h1></body></html>");
    res.end();
  } else res.end("Invalid Request!");
}); */ 
 
server.listen(port); // listen for any incoming requests
console.log(`The NodeJS server on port ${port} is now running...`);
