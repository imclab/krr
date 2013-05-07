/**
 * Router. You define here all your pages. (http://backbonejs.org/#Router)
 */
define([
  'backbone',
  'collections/feeds',
  'models/feed',
  'views/feeds/index',
  'views/feed/index'
], function( Backbone, Feeds, Feed, FeedsView, FeedView ) {

  return Backbone.Router.extend({

    routes: {
        '': 'root',
        'feeds/:id': 'showFeed'
    },

    initialize: function() {
    },

    root: function() {
      var self = this;

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
