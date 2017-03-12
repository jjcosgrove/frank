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
        content: "# Shortcuts!\n\nEverything in Frank is driven by shortcuts. That really is all you need to know*\n\nGlobal shortcut | Action\n:------- | :-----\n*Cmd+N*   |  Add note\n*Cmd+D* | Delete note\n*Cmd+F* | Search notes (with crazy RegEx support!)\n*Cmd+E* | Export notes (to JSON baby!)\n*Cmd-P* |Toggle preview (see editor shortcut)\n\n<br>\n\nEditor shortcut | Action\n:------- | :-----\n*Cmd-'* | toggleBlockquote\n*Cmd-B* | toggleBold\n*Cmd-H* | toggleHeadingSmaller\n*Cmd-I* | toggleItalic\n*Cmd-K* | drawLink\n*Cmd-L* | toggleUnorderedList\n*Cmd-P* | togglePreview\n*Cmd-Alt-C* | toggleCodeBlock\n*Cmd-Alt-I* | drawImage\n*Cmd-Alt-L* | toggleOrderedList\n*Shift-Cmd-H* | toggleHeadingBigger\n\n<br>\n\n\\*I did say it was frank... now go and unleash your inner-geek."
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
