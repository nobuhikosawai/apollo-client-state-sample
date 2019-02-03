const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
    me: User
    products: [Product]
    user(id: Int!): User
  }

  type User {
    id: Int
    name: String
    boughtProducts: [Product]
  }

  type Product {
    id: Int
    name: String
    price: Int
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    me: () => {
      return {
        id: 1,
        name: 'test',
        boughtProducts: [],
      }
    },
    products: () => {
      return [
        {
          id: 1,
          name: 'foo',
          price: 100,
        },
        {
          id: 2,
          name: 'bar',
          price: 200,
        },
        {
          id: 3,
          name: 'baz',
          price: 300,
        }
      ]
    },
    user: (_, { id }) => {
      return {
        id: 3,
        name: 'test3',
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () => 
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);
