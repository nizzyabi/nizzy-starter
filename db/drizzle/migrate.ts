import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// for query purposes
const migrationClient = postgres(process.env.DATABASE_URL! as string);

async function main() {
    await migrate(drizzle(migrationClient), {
    migrationsFolder: "./db/drizzle/migrations",
})
    await migrationClient.end()
};

main()