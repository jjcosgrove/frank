/**
 * central location for all app configs including jQuery plugins
 */

var Config = function () {
  var config = {
    'Splitjs': {
      containers: ['#notes', '#editor'],
      settings: {
        sizes: [25, 75],
        minSize: [350, 550],
        gutterSize: 2
      }
    },
    'SimpleMDE': {
      autoDownloadFontAwesome: false,
      autofocus: false,
      forceSync: true,
      hideIcons: true,
      indentWithTabs: false,
      toolbar: null,
      status: false,
      styleSelectedText: false,
      placeholder: 'Markdown goes here...',
      spellChecker: false,
      renderingConfig: {
        codeSyntaxHighlighting: true
      },
      tabSize: 2,
      shortcuts: {
        cleanBlock: null,
        toggleFullScreen: null,
        toggleSideBySide: null,
        drawTable: 'Cmd-T'
      }
    }
  }
  return config
}

module.exports = Config
