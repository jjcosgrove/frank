/**
 * all handlebars helpers, loaded at once
 */

var $ = require('jquery')
var SimpleMDE = require('simplemde')

var HandlebarsHelpers = function () {
  // converts SimpleMDE markdown/html back into text using jQuery.text()
  Handlebars.registerHelper('smdeplain', function (context, options) {
    var fakeDiv = $(document.createElement('div')).hide()
    var fakeTextarea = $(document.createElement('textarea')).hide()

    fakeTextarea.val(context)
    $(fakeDiv).append(fakeTextarea)

    var fakeSimpleMDE = new SimpleMDE({
      element: fakeTextarea[0],
      forceSync: true,
      autoDownloadFontAwesome: false,
      spellChecker: false
    })

    return $(fakeSimpleMDE.markdown(fakeSimpleMDE.value())).text()
  })
  // converts a moment() epoch/timestamp to human-readable form
  Handlebars.registerHelper('momentify', function (context, options) {
    return moment(context).format('DD-MM-Y @ HH:mm:ss')
  })
}

module.exports = HandlebarsHelpers
