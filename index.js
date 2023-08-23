const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { books } = require("./resources/data.json");
const schema = buildSchema(`
  type Query {
    findAll: [Book]
    findById(id: ID!): Book
    findByGenre(genre:String):[Book]
  }
  type Author {
    name: String
    nationality: String
  }
  type Book {
    id: Int
    title: String
    author: Author
    genre: String
    pageCount: Int
    publishedYear: Int
  }
  
`);

let getById = (args) => books.find((book) => book.id == args.id);
let findByGenre = (args) => {
  if (args.genre) {
    return books.filter((book) => book.genre == args.genre);
  }
  return books;
};
const root = {
  findAll: () => books,
  findById: getById,
  findByGenre: findByGenre,
};

const app = express();

const PORT = process.env.PORT || 4500;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Habilita la interfaz gráfica de GraphQL en http://localhost:4500/graphql
  })
);

app.listen(PORT, () => console.log(`Server listening at PORT ${PORT}`));
