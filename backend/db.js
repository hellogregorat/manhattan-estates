const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')

const adapter = new FileSync(path.join(__dirname, 'db.json'))
const db = low(adapter)

db.defaults({
  users: [],
  properties: [],
  favorites: [],
  inquiries: [],
  nextId: { user: 1, property: 1, favorite: 1, inquiry: 1 }
}).write()

module.exports = db
