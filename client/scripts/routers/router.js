/**
 * Router. You define here all your pages. (http://backbonejs.org/#Router)
 */
define([
  'backbone',
  'collections/feeds',
  'models/feed',
  'views/welcome/index',
  'views/loader/index',
  'views/feeds/index',
  'views/feed/index'
], function( Backbone, Feeds, Feed, WelcomeView, LoaderView, FeedsView, FeedView ) {

  return Backbone.Router.extend({

    routes: {
        '': 'root',
        'feeds': 'showFeeds',
        'feeds/:id': 'showFeed'
    },

    initialize: function() {
      this.LoaderView = new LoaderView();
    },

    root: function() {
      var self = this;

      // self.WelcomeView = new WelcomeView();
      // self.WelcomeView.render();

      // window.setTimeout(function() {
        self.navigate('/feeds', true);
      // }, 1500);
    },

    showFeeds: function() {
      var self = this;

      self.LoaderView.render();

      self.Feeds = new Feeds();

      self.Feeds.fetch({
        success: function() {
          self.FeedsView = new FeedsView({collection: self.Feeds});
          self.FeedsView.render();
        }
      });
    },

    showFeed: function(id) {
      var self = this;

      self.LoaderView.render();

      self.Feed = new Feed({id: id});

      self.Feed.fetch({
        success: function() {
          console.log(self.Feed.toJSON());
          self.FeedView = new FeedView({model: self.Feed});
          self.FeedView.render();
        }
      });
    }
  });
});
