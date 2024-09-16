// seed.js
const db = require('./database');

// Función para poblar la base de datos con 10 personajes
const poblarBaseDeDatos = () => {
  const personajes = [
    { nombre: 'Harry Potter', pelicula: 'Harry Potter y la Piedra Filosofal' },
    { nombre: 'Frodo Baggins', pelicula: 'El Señor de los Anillos' },
    { nombre: 'Luke Skywalker', pelicula: 'Star Wars' },
    { nombre: 'Darth Vader', pelicula: 'Star Wars' },
    { nombre: 'Hermione Granger', pelicula: 'Harry Potter y la Piedra Filosofal' },
    { nombre: 'Gandalf', pelicula: 'El Señor de los Anillos' },
    { nombre: 'Samwise Gamgee', pelicula: 'El Señor de los Anillos' },
    { nombre: 'Aragorn', pelicula: 'El Señor de los Anillos' },
    { nombre: 'Leia Organa', pelicula: 'Star Wars' },
    { nombre: 'Albus Dumbledore', pelicula: 'Harry Potter y la Cámara Secreta' }
  ];

  // Insertar los personajes en la base de datos
  const stmt = db.prepare('INSERT INTO personajes (nombre, pelicula) VALUES (?, ?)');
  personajes.forEach(personaje => {
    stmt.run(personaje.nombre, personaje.pelicula);
  });
  stmt.finalize(() => {
    console.log('Base de datos poblada con 10 personajes.');
  });
};

// Ejecutar la función para poblar la base de datos
poblarBaseDeDatos();
