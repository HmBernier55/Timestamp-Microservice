// index.js

// init project
var express = require('express');
var app = express();


var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
/*
FRONT END
HTML page with project name and examples
(This was created for me by FCC)
*/
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// BACK END

app.get("/api/:date_string", function (req, res) {
/*
Input:
  A date string in the format of YYYY-MM-DD or a unix string within the URL
Output:
  JSON object with unix and utc keys if the date or unix string is valid:
  {
    unix: unix number,
    utc: date string (Ex: Thu, 01 Jan 1970 00:00:00 GMT)
  }
  Otherwise, the output is a JSON object with an error:
  {
    error: "Invalid Date"
  }
*/
  let dateStr = req.params.date_string;
  if (/\d{5,}/.test(dateStr)) {
    res.json({
      "unix": Number(dateStr),
      "utc": new Date(Number(dateStr)).toGMTString()
    });
  } else {
    let dateObj = new Date(dateStr);
    if (dateObj.toString() === "Invalid Date") {
      res.json({
        "error": "Invalid Date"
      })
    } else {
      res.json({
        "unix": dateObj.valueOf(),
        "utc": dateObj.toGMTString()
      })
    }
  }
});


app.get("/api", function (req, res, next) {
/*
Input:
  N/A
Output:
  JSON object with unix and utc keys pertaining to the current date and time:
  {
    unix: unix string,
    utc: date string (Ex: Thu, 01 Jan 1970 00:00:00 GMT)
  }
*/
  req.time = new Date().toGMTString();
  next();
}, function (req, res) {
  res.json({
    "unix": Date.now(),
    "utc": req.time
  });
});


// listen for requests
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
