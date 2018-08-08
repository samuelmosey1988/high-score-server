const jsonBody = require("body/json");
let scores = [{
  name: "Edwin",
  score: 50
}, {
  name: "David",
  score: 39
}];

const textBody = require("body");
const resources = {
  "/IP":  "Internet Protocol",
  "/scores": scores, 
  "/TCP": "Transmission Control Protocol",
  "/DNS": "Dynamic Name Service",
// add this stuff to the getPut file you idiot.

};



const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  //res.statusCode = 200; 
  //res.setHeader("Content-Type", "text/plain");
  //res.end("Hello from Sam!\n"); 
  if (req.method === "GET") {
    if (resources[req.url] === undefined) {
      res.statusCode = 404;
      res.end("ERROR NOT FOUND");
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json'); //lower case json in code for content type. Uppercase when calling it
      const responseBody = resources[req.url];
      res.end(JSON.stringify(scores));
    }
  } else if (req.method === "POST") {
    res.statusCode = 201;
    jsonBody(req, res, (err, requestBody) => {
      res.setHeader('Content-Type', 'application/json');
      scores.push(requestBody);  
      scores.sort((a,b)=> b.score>a.score);
      scores = scores.slice(0, 3);

      res.end(JSON.stringify(requestBody));  
    })
  }
  console.log(req.url)
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});