define([
  'backbone',
  'handlebars',
  'text!templates/welcome-index.html'
], function( Backbone, Handlebars, IndexTemplate ) {

  return Backbone.View.extend({

    el: '#main',

    template: Handlebars.compile( IndexTemplate ),

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

});
