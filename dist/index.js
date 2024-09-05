"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const graphql_yoga_1 = require("graphql-yoga");
const http_1 = require("http");
const schema_1 = require("@graphql-tools/schema");
const schema_2 = require("./schema");
const resolvers_1 = require("./resolvers");
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
require("./bot");
dotenv_1.default.config();
// Initialize Supabase client
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";
exports.supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_KEY);
// Create an executable schema from type definitions and resolvers
const executableSchema = (0, schema_1.makeExecutableSchema)({
    typeDefs: schema_2.schema,
    resolvers: resolvers_1.resolvers,
});
// Create Yoga instance with the executable schema
const yoga = (0, graphql_yoga_1.createYoga)({
    schema: executableSchema,
});
// Create an HTTP server and pass the Yoga instance as a handler
const server = (0, http_1.createServer)(yoga);
// Start the server
server.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});
