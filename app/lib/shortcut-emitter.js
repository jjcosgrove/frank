/**
 * takes any incoming shortcut event from electron main
 * and sents it over the emitter (Backbone.Events) aka vent
 */

const {ipcRenderer} = require('electron')

var ShortcutEmitter = function (emitter) {
  ipcRenderer.on('shortcut', (event, arg) => {
    App.Utilities.ConsoleLogger('IPC: ' + arg.command)
    emitter.trigger(arg.command)
  })
}

module.exports = ShortcutEmitter
