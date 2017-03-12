/**
 * individual note view
 * keeps in-sync with any changes to title/content made in the editor
 * using Backbone.ModelBinder
 */

var NoteView = function (options) {
  var View = Backbone.View.extend({
    tagName: 'div',
    className: 'item note',
    template: '#note-template',
    bindings: {
      title: '.title',
      content: '.markdown'
    },
    events: {
      'click': 'renderEditorView'
    },
    initialize: function (options) {
      this.parentNotesView = options.parentNotesView

      this.binder = new Backbone.ModelBinder()

      this.listenTo(this.model, 'change', this.render)
      this.listenTo(this.model, 'reset', this.render)
      this.listenTo(this.model, 'destroy', this.removeNote)

      this.render()
    },
    render: function () {
      App.Utilities.ConsoleLogger('APP: Render NoteView')

      var source = $(this.template).html()
      var template = Handlebars.compile(source)

      this.$el.html(template(this.model.toJSON()))

      this.binder.bind(this.model, this.el, this.bindings)
      return this
    },
    renderEditorView: function (event) {
      event.preventDefault()
      this.parentNotesView.parentMainView.editorView.setModel(this.model).render()
    },
    removeNote: function () {
      App.Utilities.ConsoleLogger('APP: Remove NoteView')
      this.undelegateEvents()
      this.remove()
    }
  })
  return new View(options)
}

module.exports = NoteView
