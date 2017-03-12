/**
 * the main notes collection
 * on fetch() gets all existing notes
 */

var NotesCollection = function (attributes, options) {
  var Collection = Backbone.Collection.extend({
    model: App.Models.Note,
    comparator: function (note) {
      return -note.get('created')
    },
    fetch: function (options) {
      var collection = this
      App.DataStore.Notes.find({

      }).exec(function (err, docs) {
        if (err) throw err
        collection.reset(docs)
      })
      return this
    }
  })
  return new Collection(attributes, options)
}

module.exports = NotesCollection
