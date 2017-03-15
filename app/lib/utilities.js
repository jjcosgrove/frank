/**
 * small collection of re-usable methods for use
 * throughout the app
 */

const {app} = require('electron').remote
const {shell} = require('electron')
var fs = require('fs')
var path = require('path')

var Utilities = function () {
  var utilities = this

  this.MaybeInitializeDataStore = function () {
    var hasInitializedIndicator = path.join(app.getPath('appData'), app.getName(), 'initialized')
    if (!fs.existsSync(hasInitializedIndicator)) {
      utilities.ConsoleLogger('App: First Run!')
      var note = new App.Models.Note({
        title: 'A frank guide to Frank...',
        content: "# Shortcuts!\n\nEverything in Frank is driven by shortcuts. That really is all you need to know*\n\nGlobal shortcut | Action\n:------- | :-----\n*CmdOrCtrl+N*   |  Add note\n*CmdOrCtrl+D* | Delete note\n*CmdOrCtrl+F* | Search notes (RegEx-based)\n*CmdOrCtrl+E* | Export notes (JSON)\n*CmdOrCtrl+S* | Save note (Markdown)\n*CmdOrCtrl+P* |Toggle preview (see editor shortcut)\n\n<br>\n\nEditor shortcut | Action\n:------- | :-----\n*CmdOrCtrl+'* | toggleBlockquote\n*CmdOrCtrl+B* | toggleBold\n*CmdOrCtrl+H* | toggleHeadingSmaller\n*CmdOrCtrl+I* | toggleItalic\n*CmdOrCtrl+K* | drawLink\n*CmdOrCtrl+L* | toggleUnorderedList\n*CmdOrCtrl+P* | togglePreview\n*CmdOrCtrl+Alt+C* | toggleCodeBlock\n*CmdOrCtrl+Alt+I* | drawImage\n*CmdOrCtrl+Alt+L* | toggleOrderedList\n*Shift+CmdOrCtrl+H* | toggleHeadingBigger\n\n<br>\n\n\\*I did say it was frank..."
      })
      note.save()
      fs.writeFileSync(hasInitializedIndicator)
    }
  }

  this.ConsoleLogger = function (data) {
    var currentdate = new Date()
    var datetime =
      currentdate.getHours() + ':' +
      currentdate.getMinutes() + ':' +
      currentdate.getSeconds() + ':' +
      currentdate.getMilliseconds()

    if (typeof data === 'object') {
      setTimeout(console.log.bind(console, data))
    } else {
      setTimeout(console.log.bind(console, datetime + ': %s\n================================================\n', data))
    }
  }

  this.Saver = function (note, title) {
    utilities.ConsoleLogger('IPC: Saving')

    var exportLink = document.createElement('a')
    exportLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(note))
    exportLink.setAttribute('download', title + '.md')
    exportLink.click()
  }

  this.Exporter = function (data, filename) {
    utilities.ConsoleLogger('IPC: Exporting')

    var exportLink = document.createElement('a')
    exportLink.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)))
    exportLink.setAttribute('download', filename)
    exportLink.click()
  }

  this.OpenLinkExternally = function (url) {
    shell.openExternal(url)
  }
}

module.exports = Utilities
