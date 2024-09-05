import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { schema } from "./schema";
import { resolvers } from "./resolvers";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import "./bot";

dotenv.config();

// Initialize Supabase client
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Create an executable schema from type definitions and resolvers
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

// Create Yoga instance with the executable schema
const yoga = createYoga({
  schema: executableSchema,
});

// Create an HTTP server and pass the Yoga instance as a handler
const server = createServer(yoga);

// Start the server
server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
