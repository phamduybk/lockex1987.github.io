function sendGetRequest() {
    const http = require('http');

    const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/todos',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        
        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (error) => {
        console.error(error);
    })

    req.end();
}

function sendGetRequest2() {
    var http = require('http');
    
    http.get({
            host: 'localhost',
            port: 8080,
            path: '/userDetail'
        }, function(response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                // Data received, let us parse it using JSON!
                var parsed = JSON.parse(body);
                console.log(parsed.url, parsed.method);
            });
        });
}

function sendGetRequest3() {
    const http = require('http');
    
    http.get('http://localhost:8080/planetary/apod?api_key=DEMO_KEY', (resp) => {
        let data = '';
        
        // A chunk of data has been recieved
        resp.on('data', (chunk) => {
            data += chunk;
        });
        
        // The whole response has been received. Print out the result
        resp.on('end', () => {
            console.log(data);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

function sendPostRequest() {
    const http = require('http');

    const data = JSON.stringify({
        todo: 'Buy the milk'
    });
    
    const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/todos',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };
    
    const req = http.request(options, (res) => {
        console.log("\n");
        console.log(`statusCode: ${res.statusCode}`);
        
        res.on('data', (d) => {
            process.stdout.write(d)
        });
    });
    
    req.on('error', (error) => {
        console.error(error);
    });
    
    req.write(data);
    req.end();
}

function sendPostRequest2() {
    var http = require("http");
    var querystring = require("querystring");

    const postData = querystring.stringify({
        'msg': 'Hello World!'
    });

    const options = {
        //host: "",
        hostname: 'localhost',
        port: 8080,
        path: '/upload',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    
    var req = http.request(options, function(res) {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        
        var responseString = "";
        
        res.on("data", function(data) {
            responseString += data;
        });
        
        res.on("end", function() {
            console.log(responseString);
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
    
    //req.write();
    req.write(postData);
    req.end();
}

//sendGetRequest();
//sendGetRequest2();
//sendGetRequest3();

//sendPostRequest();
sendPostRequest2();

// PUT and DELETE requests use the same POST request format, and just change the options.method value
