// Import
var express = require('express')
    feedParser = require('feedparser'),
    request = require('request');

// Server
var app = express();

app.get('/', function(req, res) {
  var content1,
      content2;

  request('http://www.fubiz.net/feed/')
    .pipe(new feedParser())
    .on('error', function (error) {
      console.error(error);
    })
    .on('meta', function (meta) {
      content1 += '<h1>===== ' + meta.title + ' =====</h1>';
    })
    .on('article', function(article) {
      content1 += '<p><a href="' + article.link + '">' + article.title || article.description + '</a></p>';
    })
    .on('end', function() {
      res.send(content1);
    });

  request('http://rss1.smashingmagazine.com/feed/')
    .pipe(new feedParser())
    .on('error', function (error) {
      console.error(error);
    })
    .on('meta', function (meta) {
      content2 += '<h1>===== ' + meta.title + ' =====</h1>';
    })
    .on('article', function(article) {
      content2 += '<p><a href="' + article.link + '">' + article.title || article.description + '</a></p>';
    })
    .on('end', function() {
      res.send(content2);
    });
});

app.listen(3000);