/**
 * entry point view for the app
 * itself a noop view, which manages relationships
 * to child views: NotesView and EditorView
 * includes Split.js handling for main UI/layout
 * and simple RegEx search handling
 */

var MainView = function (options) {
  var View = Backbone.View.extend({
    el: '#app',
    searchContainer: '#search',
    searchInput: '#search input',
    initialize: function () {
      this.setNotesView()
      this.setEditorView()
      this.render()
      this.listenTo(App.Vent, 'search-notes', this.toggleSearch)
    },
    render: function () {
      App.Utilities.ConsoleLogger('APP: Render MainView')
      this.split()
      this.activateSearch()
    },
    setNotesView: function () {
      App.Utilities.ConsoleLogger('APP: Setting NotesView')
      this.notesView = new App.Views.Notes({
        parentMainView: this,
        collection: this.collection
      })
    },
    setEditorView: function () {
      App.Utilities.ConsoleLogger('APP: Setting EditorView')
      this.editorView = new App.Views.Editor({
        parentMainView: this
      })
    },
    toggleSearch: function () {
      App.Utilities.ConsoleLogger('APP: Toggle Search')
      this.$el.find(this.searchContainer).toggleClass('hidden').find('input').focus()
    },
    split: function () {
      App.Utilities.ConsoleLogger('APP: Splitting')
      Split(App.Config.Splitjs.containers, App.Config.Splitjs.settings)
    },
    /**
     * takes user input as 'RegEx' and compares to: title, plaintext and markdown
     * hide/shows matches accordingly on change
     */
    activateSearch: function () {
      var app = this
      this.$el.find(this.searchInput).on('input', function () {
        var search = $(this).val()
        try {
          var regex = new RegExp(search, 'igm')
          app.$el.find('.note').each(function (index, element) {
            var title = $(element).find('.title').text()
            var markdown = $(element).find('.markdown').text()
            var plaintext = $(element).find('.plaintext').text()
            if (regex.test(title) | regex.test(markdown) | regex.test(plaintext)) {
              $(element).show()
              $(element).next('.divider').show()
            } else {
              $(element).hide()
              $(element).next('.divider').hide()
            }
          })
        } catch (e) {
          App.Utilities.ConsoleLogger('APP: Invalid Regular Express')
        }
      })
    }
  })
  return new View(options)
}

module.exports = MainView
