// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Crear la tabla de personajes
db.serialize(() => {
  db.run(`
    CREATE TABLE personajes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      pelicula TEXT NOT NULL
    )
  `);

  // Insertar algunos personajes de ejemplo
  db.run("INSERT INTO personajes (nombre, pelicula) VALUES ('Harry Potter', 'Harry Potter y la Piedra Filosofal')");
  db.run("INSERT INTO personajes (nombre, pelicula) VALUES ('Frodo Baggins', 'El Señor de los Anillos')");
});

module.exports = db;