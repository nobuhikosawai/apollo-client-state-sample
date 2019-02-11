import { gql } from 'apollo-boost';

export const defaults = {
  likedProducts: [],
}

export const resolvers = {
  Mutation: {
    addLikedProducts: (_: any, { id }:any, { cache }:any ) => {
      const query = gql`
        query {
          likedProducts @client
        }
      `; 
      const previous = cache.readQuery({ query });
      const newData = [...previous.likedProducts, id];
      const data = { likedProducts: newData };
      cache.writeData({ data });
      return newData;
    }
  }
};
