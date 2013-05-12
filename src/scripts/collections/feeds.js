define([
    'backbone',
    'models/feed'
], function( Backbone, Feed ) {

  return Backbone.Collection.extend({
    url: '/api/feeds',
    model: Feed
  });
});
