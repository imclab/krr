define([
  'backbone',
  'handlebars',
  'text!templates/feeds-index.html'
], function( Backbone, Handlebars, IndexTemplate ) {

  return Backbone.View.extend({

    // This is the access point. My view will be linked to #main in the html.
    el: '#main', // = $('#main')

    template: Handlebars.compile( IndexTemplate ),

    render: function() {
      this.$el.html(this.template({feeds: this.collection.toJSON()}));
      return this;
    }
  });

});
