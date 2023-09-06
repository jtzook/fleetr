import { useState, useEffect } from 'react'
import sqlite3 from 'sqlite3'
import path from 'path'

export const useSQLite = () => {
  const [db, setDb] = useState<sqlite3.Database | null>(null)
  const [notes, setNotes] = useState<any[]>([])

  useEffect(() => {
    const dbPath = path.resolve(__dirname, 'slides.db') // Replace with your db path
    const newDb = new sqlite3.Database(dbPath, (err) => {
      if (err) console.error('Database opening error: ', err)
    })
    setDb(newDb)

    // Initialize table
    newDb.serialize(() => {
      newDb.run(`
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

    return () => {
      newDb.close((err) => {
        if (err) console.error('Database closing error: ', err)
      })
    }
  }, [])

  const fetchNotes = () => {
    db?.all('SELECT * FROM notes', [], (err, rows) => {
      if (err) {
        throw err
      }
      setNotes(rows)
    })
  }

  const createNote = (title: string, text: string) => {
    const sql = `INSERT INTO notes (title, text) VALUES (?, ?)`
    db?.run(sql, [title, text], function (err) {
      if (err) {
        return console.error(err.message)
      }
      fetchNotes()
    })
  }

  // Implement update and delete operations similarly

  return {
    notes,
    fetchNotes,
    createNote,
    // add other CRUD methods like updateNote, deleteNote etc.
  }
}
