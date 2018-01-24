import { makeExecutableSchema } from 'graphql-tools';

// import { resolvers as userResolvers } from './user/resolvers';
import { resolvers } from './user/resolvers';
import { typeDefs } from './user/typeDefs';

// @ts-ignore
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
