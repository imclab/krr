// Import
var express = require('express')
    feedParser = require('feedparser'),
    request = require('request'),
    fs = require('fs'),
    _ = require('lodash');

// Load data file
var feeds = JSON.parse(fs.readFileSync(__dirname + '/db/feeds.json'));

// Add ids
var i = 0,
    content = [];

_.each(feeds, function(item) {
  item.id = i;
  content.push(item);
  i++;
});

feeds = content;

// Server
var app = express();

// Config
app.configure(function() {
  app.set('title', 'Web feed client');
});

app.use(express.static(__dirname + '/../client'));
//app.use(express.logger());

app.get('/api/feeds', function(req, res) {
  res.json(content);
});

// API
app.get('/api/feeds/:id', function(req, res) {
  var globalContent = [];

  var renderFeeds = _.after(feeds[req.params.id].feeds.length, render);

  _.each(feeds[req.params.id].feeds, function(feed) {
    var item = {};
        item.articles = [];

    request(feed.url)
      .pipe(new feedParser())
      .on('error', function (error) {
        console.error(error);
      })
      .on('meta', function (meta) {
        item.title = meta.title;
      })
      .on('article', function(article) {
        var e = {};

        e.link = article.link;
        e.title = article.title;

        item.articles.push(e);
      })
      .on('end', function() {
        globalContent.push(item);
        renderFeeds();
      });
  });


  function render() {
    res.json(globalContent);
  }
});

// Start server
console.log("...and now, the show! ➤  http://localhost:3000");
app.listen(3000);