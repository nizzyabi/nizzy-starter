import { pgTable, uuid, varchar, numeric } from "drizzle-orm/pg-core"

export const user = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email").unique().notNull(),
    name: varchar("name", { length: 300 }).notNull(),
    password: varchar("password").notNull()
}) 

export const event = pgTable("event", {
    id: uuid("id").primaryKey().defaultRandom(),
    fullName: varchar("fullName").notNull(),
    age: numeric("age").notNull(),
})


export type User = typeof user.$inferSelect;
