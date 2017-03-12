/**
 * editor view. represents a single 'model' or note
 * re-created on change of note selected.
 * includes SimpleMDE and Highlight.js handling
 */

var EditorView = function (options) {
  var View = Backbone.View.extend({
    el: '#editor',
    template: '#editor-template',
    events: {
      'keyup': 'autoSave',
      'click a': 'openLinkExternally',
      'dblclick': 'maybeTogglePreview'
    },
    bindings: {
      title: '#title',
      content: '#content'
    },
    initialize: function () {
      this.binder = new Backbone.ModelBinder()
      this.listenTo(App.Vent, 'toggle-preview', this.togglePreview)
    },
    setModel: function (model) {
      this.model = model
      return this
    },
    render: function () {
      App.Utilities.ConsoleLogger('APP: Render EditorView')

      var source = $(this.template).html()
      var template = Handlebars.compile(source)
      this.$el.html(template(this.model.toJSON()))

      this.binder.bind(this.model, this.el, this.bindings, {changeTriggers: {'': 'change keyup'}})

      this.$el.hide()
      this.markdown()
      this.highlight()
      this.togglePreview()

      this.$el.delay(125).stop(true, true).fadeIn()

      return this
    },
    markdown: function () {
      App.Utilities.ConsoleLogger('APP: Activating Editor')
      this.editor = new SimpleMDE(App.Config.SimpleMDE)
    },
    highlight: function () {
      App.Utilities.ConsoleLogger('APP: Highlighting')
      this.$el.find('pre code').each(function (index, block) {
        hljs.highlightBlock(block)
      })
    },
    autoSave: _.throttle(function () {
      App.Utilities.ConsoleLogger('APP: AutoSaving...')
      this.$el.find('#title').trigger('change')
      this.$el.find('#content').trigger('change')
      this.model.save()
    }, 500, {
    }),
    togglePreview: function () {
      App.Utilities.ConsoleLogger('APP: Toggle Preview')
      var editor = this.editor
      if (!_.isUndefined(editor)) {
        editor.togglePreview()
      }
      return this
    },
    maybeTogglePreview: function () {
      App.Utilities.ConsoleLogger('APP: Maybe Toggle Preview')
      var editor = this.editor
      if (!_.isUndefined(editor) && editor.isPreviewActive()) {
        editor.togglePreview()
      }
      return this
    },
    openLinkExternally: function (event) {
      App.Utilities.ConsoleLogger('APP: Open Link')
      event.preventDefault()
      var url = event.target.href
      App.Utilities.OpenLinkExternally(url)
    }
  })
  return new View(options)
}

module.exports = EditorView
