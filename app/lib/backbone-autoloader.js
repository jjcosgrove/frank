/**
 * automagically loads in all MVVM from relavant paths
 * as set in main.js (render/app) - relative to app root.
 */

var fs = require('fs')
var path = require('path')

var BackboneAutoLoader = function (entityType) {
  var entityPath = path.join(__dirname, '../', entityType)
  var files = fs.readdirSync(entityPath)

  // storage
  var entities = {}

  // load up each file and its contents, and normalize names
  for (var i = 0; i < files.length; i++) {
    var fileName = files[i]
    var baseName = fileName.substr(0, fileName.lastIndexOf('.'))
    var baseParts = baseName.split('-')
    _.each(baseParts, function (element, index, list) {
      list[index] = element.charAt(0).toUpperCase() + element.slice(1)
    })

    // in case of hyphenated filenames, e.g: line-items; produces LineItems
    var entityName = baseParts.join('')
    var entity = require(path.join(entityPath, baseName))

    // assign
    entities[entityName] = entity
  }
  return entities
}

module.exports = BackboneAutoLoader
