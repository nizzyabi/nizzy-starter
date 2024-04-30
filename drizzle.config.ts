import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    // schema file
    schema: "./db/drizzle/schema.ts",
    // migration files
    out: "./db/drizzle/migrations",
    // postgrese driver
    driver: "pg",
    // database 
    dbCredentials: {
        connectionString: process.env.DATABASE_URL! as string
    },
    // tell us what is changinging when migrating
    verbose: true,
    // tell us when changes need to be made and ask us to confirm
    strict: true,
})
