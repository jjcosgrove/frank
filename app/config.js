/**
 * central location for all app configs including jQuery plugins
 */

var Config = function () {
  var config = {
    'Splitjs': {
      containers: ['#notes', '#editor'],
      settings: {
        sizes: [35, 65],
        minSize: [250, 400],
        gutterSize: 2
      }
    },
    'SimpleMDE': {
      autoDownloadFontAwesome: false,
      autofocus: false,
      forceSync: true,
      hideIcons: true,
      indentWithTabs: false,
      placeholder: 'Markdown goes here...',
      renderingConfig: {
        codeSyntaxHighlighting: true
      },
      shortcuts: {
        cleanBlock: null,
        toggleFullScreen: null,
        toggleSideBySide: null,
        togglePreview: null,
        drawTable: 'Cmd-T'
      },
      spellChecker: false,
      status: false,
      styleSelectedText: false,
      tabSize: 2,
      toolbar: null
    }
  }
  return config
}

module.exports = Config
