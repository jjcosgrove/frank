/**
 * single page so only one route: main
 * loads up the 'virtual' view which in turn
 * sets its child views up
 */

var Router = function () {
  var Router = Backbone.Router.extend({
    routes: {
      '': 'main'
    },
    main: function () {
      var mainView = new App.Views.Main({
        collection: App.Collections.Notes
      })
    }
  })
  return new Router()
}

module.exports = Router
