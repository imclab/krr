/**
 * Example of a collection. (http://backbonejs.org/#Collection)
 */
define([
    'backbone',
    'models/feed'
], function( Backbone, Feed ) {

  return Backbone.Collection.extend({
    url: '/api/feeds',
    model: Feed
  });
});
