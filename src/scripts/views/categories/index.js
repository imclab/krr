define([
  'backbone',
  'handlebars',
  'text!templates/feeds-index.html'
], function( Backbone, Handlebars, IndexTemplate ) {

  return Backbone.View.extend({

    el: '#aside',

    events: {
      'click .category': 'changeCategory'
    },

    template: Handlebars.compile( IndexTemplate ),

    render: function() {
      this.$el.html(this.template({feeds: this.collection.toJSON()}));
      this.$category = this.$el.find('.category');
      return this;
    },

    changeCategory: function(e) {
      e.preventDefault();

      var element = e.currentTarget;
          $element = $(element),
          url = $element.attr('href');

      this.$category.removeClass('is-active');
      $element.addClass('is-active');

      Backbone.history.navigate(url, true);
    },

    noChoice: function() {
      this.$category.removeClass('is-active');
    }
  });

});
