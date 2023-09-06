import sqlite3Lib from 'sqlite3'
import path from 'path'
import fs from 'fs'
const { verbose } = sqlite3Lib
const sqlite3 = verbose()

// Verify and create 'data' directory if it doesn't exist
const dataDir = path.resolve(process.cwd(), '../data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir)
}

// Path to the database file
const dbPath = path.resolve(dataDir, 'slides.db')
console.log(`Database path: ${dbPath}`) // Log to debug

// Initialize database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err)
    return
  }

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        text TEXT,
        comments TEXT,
        labels TEXT,
        created TEXT,
        updated TEXT,
        timestamp INTEGER
      )
    `)
  })

  db.close()
})
