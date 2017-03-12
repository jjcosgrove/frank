/**
 * props to: https://github.com/akonwi/backbone.nedb
 * handy util module to auto-sync backbone models with NeDB
 * originally in CofeeScript, translated by me to JS
 */

var NeDBSyncAdapter = {
  Sync : function (Backbone, DB) {
    var methodMap
    Backbone.sync = function (method, model, options) {
      return methodMap[method](model, options)
    }
    return methodMap = {
      create: function (model, options) {
        var attributes
        App.Utilities.ConsoleLogger('DB: Create Model')
        attributes = model.toJSON()
        return DB.insert(attributes, function (err, doc) {
          if (err != null) {
            model.trigger('request', model, err, options)
          }
          model.trigger('request', model, doc, options)
          if (err != null) {
            if (typeof options.error === 'function') {
              options.error(doc, err)
            }
          }
          return typeof options.success === 'function' ? options.success(doc, err) : void 0
        })
      },
      update: function (model, options) {
        var attributes
        App.Utilities.ConsoleLogger('DB: Update Model')
        attributes = model.toJSON()
        return DB.update({
          _id: attributes._id
        }, attributes, {}, function (err, numReplaced) {
          if (err != null) {
            model.trigger('request', model, err, options)
          }
          model.trigger('request', model, numReplaced, options)
          if (err != null) {
            if (typeof options.error === 'function') {
              options.error(numReplaced)
            }
          }
          if (numReplaced != null) {
            return typeof options.success === 'function' ? options.success(numReplaced) : void 0
          }
        })
      },
      delete: function (model, options) {
        var attributes
        App.Utilities.ConsoleLogger('DB: Delete Model')
        attributes = model.toJSON()
        return DB.remove({
          _id: attributes._id
        }, function (err) {
          if (err != null) {
            model.trigger('request', model, err, options)
          }
          model.trigger('request', model, null, options)
          if (err != null) {
            return typeof options.error === 'function' ? options.error(err) : void 0
          } else {
            return typeof options.success === 'function' ? options.success() : void 0
          }
        })
      },
      read: function (model, options) {
        App.Utilities.ConsoleLogger('DB: Fetch Model')
        return DB.findOne({
          _id: model.get('_id')
        }, function (err, doc) {
          if (err != null) {
            model.trigger('request', model, err, options)
          }
          model.trigger('request', model, doc, options)
          if (typeof options.error === 'function') {
            options.error(doc, err)
          }
          return typeof options.success === 'function' ? options.success(doc) : void 0
        })
      }
    }
  }
}

module.exports = NeDBSyncAdapter
