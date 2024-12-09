// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   dialect: "postgresql",
//   schema: "./configs/schema.js",
//   out: "./drizzle",

//   driver: "pglite",
//   dbCredentials: {
//     url: 'postgresql://propsmasterDB_owner:n17RoiGbgpfT@ep-still-paper-a26xmktl.eu-central-1.aws.neon.tech/propsmasterDB?sslmode=require',
//     }
// })
/** @type {import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
  url: "postgresql://propsmasterDB_owner:n17RoiGbgpfT@ep-still-paper-a26xmktl.eu-central-1.aws.neon.tech/propsmasterDB?sslmode=require",
  }
};
