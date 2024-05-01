import { pgTable, uuid, varchar, numeric } from "drizzle-orm/pg-core"

export const user = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email").unique().notNull(),
    name: varchar("name", { length: 300 }).notNull(),
    password: varchar("password").notNull()
}) 

export type User = typeof user.$inferSelect;
