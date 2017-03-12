/**
 * simply creates/loads an NeDB store and passes it back
 */

const {app} = require('electron').remote
var path = require('path')
var NeDB = require('nedb')

var NeDBDataStore = function (dbPath) {
  var db = new NeDB({
    filename: path.join(app.getPath('appData'), app.getName(), dbPath)
  })
  db.loadDatabase(function (err) {
    if (err) throw err
  })
  return db
}

module.exports = NeDBDataStore
