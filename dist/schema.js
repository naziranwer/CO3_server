"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.schema = (0, graphql_tag_1.gql) `
  type Query {
    getUser(email: String!): User
  }

  type Mutation {
    tapCoin(email: String!): String
  }

  type User {
    id: ID!
    email: String!
    coins: Int!
  }
`;
