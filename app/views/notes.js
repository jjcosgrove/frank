/**
 * builds and manages the list of notes
 * handles various events from UI: add, delete and export
 */

var NotesView = function (options) {
  var View = Backbone.View.extend({
    el: '#notes',
    template: '#notes-template',
    events: {
      'click .note': 'setNoteAsSelected'
    },
    initialize: function (options) {
      this.parentMainView = options.parentMainView

      var Collection = this.collection
      this.collection = new Collection()
      this.collection.fetch()

      this.listenTo(this.collection, 'reset', this.render)
      this.listenTo(App.Vent, 'add-note', this.renderEditorViewWithNewNote)
      this.listenTo(App.Vent, 'delete-note', this.deleteNote)
      this.listenTo(App.Vent, 'export-notes', this.exportNotes)
    },
    render: function () {
      App.Utilities.ConsoleLogger('APP: Render NotesView')
      _.each(this.collection, function (element, index, list) {
        var noteView = new App.Views.Note({
          parentNotesView: this,
          model: list.at(index)
        })
        this.$el.append(noteView.$el)
      }, this)
      return this
    },
    setNoteAsSelected: function (event) {
      App.Utilities.ConsoleLogger('APP: Setting Selected')
      event.preventDefault()
      var note = event.currentTarget
      this.$el.find('.note, .divider').each(function (index, element) {
        $(element).removeClass('selected')
      })
      $(note).addClass('selected')
      $(note).prev('.divider').addClass('selected')
      $(note).next('.divider').addClass('selected')
    },
    renderEditorViewWithNewNote: function () {
      var newNote = this.collection.create()
      this.parentMainView.editorView.setModel(
        newNote
      ).render()

      var editor = this.parentMainView.editorView
      _.defer(function () {
        editor.togglePreview()
      })

      var noteView = new App.Views.Note({
        parentNotesView: this,
        model: newNote
      })
      this.$el.find('.note').each(function (index, element) {
        $(element).removeClass('selected')
      })
      noteView.$el.addClass('selected')
      this.$el.prepend(noteView.$el)
    },
    deleteNote: function () {
      App.Utilities.ConsoleLogger('APP: Delete Note')
      if (!_.isUndefined(this.parentMainView.editorView.model)) {
        this.parentMainView.editorView.model.destroy()
      }
      this.parentMainView.editorView.$el.hide()
    },
    exportNotes: function () {
      App.Utilities.ConsoleLogger('APP: Export Notes')
      App.Utilities.Exporter(this.collection.toJSON(), 'notes.json')
    }
  })
  return new View(options)
}

module.exports = NotesView
