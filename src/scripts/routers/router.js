/**
 * Router. You define here all your pages. (http://backbonejs.org/#Router)
 */
define([
  'backbone',
  'collections/feeds',
  'models/feed',
  'views/welcome/index',
  'views/loader/index',
  'views/categories/index',
  'views/feeds/index'
], function( Backbone, Feeds, Feed, WelcomeView, LoaderView, CategoriesView, FeedsView ) {

  return Backbone.Router.extend({

    routes: {
        '': 'root',
        'feeds/:id': 'showFeed'
    },

    initialize: function() {
      var self = this;

      self.LoaderView = new LoaderView();

      self.Feeds = new Feeds();

      self.Feeds.fetch({
        success: function() {
          self.CategoriesView = new CategoriesView({collection: self.Feeds});
          self.CategoriesView.render();
        }
      });
    },

    root: function() {
      var self = this;

      if(typeof self.CategoriesView != 'undefined') {
        self.CategoriesView.noChoice();
      }

      self.WelcomeView = new WelcomeView();
      self.WelcomeView.render();
    },

    showFeed: function(id) {
      var self = this;

      self.LoaderView.render();

      self.Feed = new Feed({id: id});

      self.Feed.fetch({
        success: function() {
          self.FeedViews = new FeedsView({model: self.Feed});
          self.FeedViews.render();
        }
      });
    }
  });
});
