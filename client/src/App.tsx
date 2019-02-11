import React, { Component } from 'react';
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import './App.css';
import { defaults, resolvers } from './resolvers';

const typeDefs = `
  type Mutation {
    addLikedProducts(id: Int!): [LikedProduct]
  }

  type LikedProduct: Int!
`;

const uri = 'http://localhost:4000/graphql';
const client = new ApolloClient({
  uri,
  clientState: {
    defaults,
    resolvers,
    typeDefs,
  }
})

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
    }
    likedProducts @client
  }
`;

const ADD_LIKED_PRODUCTS = gql`
  mutation addLikedProducts($id: Int!) {
    addLikedProducts(id: $id) @client
  }
`;

const Products = () => (
  <Query query={GET_PRODUCTS}>
  {
    ({ loading, error, data }) => {
      if (loading) return <p> loading... </p>;
      if (error) return <p> Error </p>;

      return data.products.map((product: any) =>(
        <Product
          key={product.name}
          name={product.name}
          id={product.id}
          isLiked={data.likedProducts.find((id: any) => id === product.id)}
        />
      ))
    }
  }
  </Query>
);

const Product = ({ name, id, isLiked }: any) => (
  <Mutation mutation={ADD_LIKED_PRODUCTS} variables={{ id }} >
    { addLikedProducts => {
      return(
        <div>
          <button onClick={() => addLikedProducts(id)}></button>
          <p>{name}</p>
          <p>{isLiked ? 'yes' : 'no'}</p>
        </div>)
      }
    }
  </Mutation>
)

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <Products />
          </header>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
