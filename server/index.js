// Import
var express = require('express')
    feedParser = require('feedparser'),
    request = require('request'),
    fs = require('fs'),
    _ = require('lodash');

// Load data file
var feeds = JSON.parse(fs.readFileSync('feeds.json'));

// Server
var app = express();

// Config
app.configure(function() {
  app.set('title', 'Web feed client');
});

app.use(express.static(__dirname + '/../client'));
app.use(express.logger());

app.get('/api/feeds', function(req, res) {
  res.json(feeds);
});

// API
app.get('/api/feeds/:id', function(req, res) {
  var content;

  _.each(feeds[req.params.id].feeds, function(feed) {
    request(feed.url)
      .pipe(new feedParser())
      .on('error', function (error) {
        console.error(error);
      })
      .on('meta', function (meta) {
        content += '<h1>===== ' + meta.title + ' =====</h1>';
      })
      .on('article', function(article) {
        content += '<p><a href="' + article.link + '" target="_blank">' + article.title || article.description + '</a></p>';
      })
      .on('end', function() {
        res.send(content);
      });
  });
});

// Start server
app.listen(3000);