import React, { Component } from 'react';
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from 'react-apollo';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})

const Products = () => (
  <Query
    query={gql`
      query {
        products {
          name
        }
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
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <Products />
          </header>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
