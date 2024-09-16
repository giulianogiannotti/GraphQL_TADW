const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const db = require('./database');

// Definir el esquema GraphQL
const schema = buildSchema(`
  type Personaje {
    id: ID!
    nombre: String!
    pelicula: String!
  }

  type Query {
    personajes: [Personaje]
    personaje(id: ID!): Personaje
  }

  type Mutation {
    agregarPersonaje(nombre: String!, pelicula: String!): Personaje
    actualizarPersonaje(id: ID!, nombre: String, pelicula: String): Personaje
    eliminarPersonaje(id: ID!): String
  }
`);

// Definir los resolvers
const root = {
  personajes: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM personajes', [], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  },
  
  personaje: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM personajes WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  },

  agregarPersonaje: ({ nombre, pelicula }) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('INSERT INTO personajes (nombre, pelicula) VALUES (?, ?)');
      stmt.run([nombre, pelicula], function (err) {
        if (err) {
          reject(err);
        }
        resolve({ id: this.lastID, nombre, pelicula });
      });
      stmt.finalize();
    });
  },

  actualizarPersonaje: ({ id, nombre, pelicula }) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE personajes SET nombre = ?, pelicula = ? WHERE id = ?',
        [nombre, pelicula, id],
        function (err) {
          if (err) {
            reject(err);
          }
          resolve({ id, nombre, pelicula });
        }
      );
    });
  },

  eliminarPersonaje: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM personajes WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err);
        }
      });
    });
  }
};

// Configurar el servidor Express con GraphQL
const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Servidor GraphQL corriendo en http://localhost:4000/graphql');
});