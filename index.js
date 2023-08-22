const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { books } = require("./resources/data.json");
const schema = buildSchema(`
  type Query {
    message: String
  }
`);

const root = {
  message: () => "Hello, GraphQL!",
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
