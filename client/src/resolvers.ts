import { gql } from 'apollo-boost';

export const defaults = {
  likedProducts: [],
}

export const resolvers = {
  Mutation: {
    addLikedProducts: (_: any, { prodcutId }:any, { cache }:any ) => {
      const query = gql`
        query GetLikedPost {
          likedPost @client
        }
      `; 
      const previous = cache.readQuery({ query });
      const newData = [...previous, prodcutId];
      const data = { likedProducts: newData };
      cache.writeData({ data });
      return newData;
    }
  }
};
