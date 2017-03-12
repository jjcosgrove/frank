/**
 * the main note model
 * sets a default title and created timestamp
 * using moment()
 */

var NoteModel = function (attributes, options) {
  var Model = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
      title: 'New Note',
      created: moment().valueOf()
    }
  })
  return new Model(attributes, options)
}

module.exports = NoteModel
