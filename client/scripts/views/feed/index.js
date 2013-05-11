define([
  'backbone',
  'handlebars',
  'text!templates/feed-index.html'
], function( Backbone, Handlebars, IndexTemplate ) {

  return Backbone.View.extend({

    el: '#main',

    template: Handlebars.compile( IndexTemplate ),

    render: function() {
      this.$el.html(this.template({feeds: this.model.toJSON()}));
      return this;
    }
  });

});
