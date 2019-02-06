import React, { Component } from 'react';
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from 'react-apollo';
import './App.css';
import { defaults, resolvers } from './resolvers';

const uri = 'http://localhost:4000/graphql';
const client = new ApolloClient({
  uri,
  clientState: {
    defaults,
    resolvers,
  }
})

const Products = () => (
  <Query
    query={gql`
      query {
        products {
          name
        }
        likedProducts @client
      }
    `}
  >
  {
    ({ loading, error, data }) => {
      if (loading) return <p> loading... </p>;
      if (error) return <p> Error </p>;

      return data.products.map((product: any) =>(
        <p>
          {product.name}
        </p>
      ))
    }
  }
  </Query>
);

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
