var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var peopleData = require('./peopleData');

var app = express();

var port = process.env.PORT || 8000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/people', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/people.html');
});

// var availablePeople = [
//   'luke',
//   'leia',
//   'rey',
//   'finn',
//   'r2d2'
// ];

app.get('/people/:person', function (req, res, next) {
  var person = req.params.person.toLowerCase();
  if (peopleData[person]) {
    res.render('photoPage', peopleData[person]);
  } else {
    next();
  }

  // if (availablePeople.indexOf(person) >= 0) {
  //   res.status(200).sendFile(
  //     __dirname + '/public/people/' + person + '.html'
  //   );
  // } else {
  //   next();
  // }
});

app.get("*", function (req, res, next) {
  // res.status(404).sendFile(__dirname + '/public/404.html');
  res.status(404).render('404', {});
});

app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on port 8000");
});
