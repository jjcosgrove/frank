/**
 * main application bootstrap
 * note: paths are relative to render.html (one level up)
 * storage: uses NeDB by default and is exportable as JSON via UI
 * using the in-app shortcut: CmdOrCtrl+E
 */

var App = App || {};

(function ($) {
  var Config = require('./app/config')

  var DataStore = require('./app/lib/nedb-data-store')
  var SyncAdapter = require('./app/lib/nedb-sync-adapter')

  var AutoLoader = require('./app/lib/backbone-autoloader')

  var Router = require('./app/router')

  var ShortcutEmitter = require('./app/lib/shortcut-emitter')

  var HandlebarsHelpers = require('./app/lib/handlebars-helpers')
  var Utilities = require('./app/lib/utilities')

  $.App = function () {
    // config located in config.js
    App.Config = new Config()

    // create the main data store, called Notes
    App.DataStore = {}
    App.DataStore.Notes = new DataStore('notes.nedb')
    SyncAdapter.Sync(Backbone, App.DataStore.Notes)

    // automagically load up the MVVM
    App.Models = new AutoLoader('models')
    App.Collections = new AutoLoader('collections')
    App.Views = new AutoLoader('views')

    // single page, so one route
    App.Router = new Router()

    // for intra-app communications and electron main->render shortcuts
    App.Vent = _.extend({}, Backbone.Events)
    App.ShortcutEmitter = new ShortcutEmitter(App.Vent)

    // some helpers
    App.Helpers = new HandlebarsHelpers()
    App.Utilities = new Utilities()

    // first-run instructions/note
    App.Utilities.MaybeInitializeDataStore()

    // backbone requirement
    Backbone.history.start()
  }
})(jQuery)

$(document).ready(function () {
  // go!
  $.App()
})
