import { pgTable, uuid, text, numeric, boolean } from 'drizzle-orm/pg-core';

export const serviceSchema = pgTable('services', {
  id: uuid().defaultRandom().notNull().primaryKey(),
  name: text().notNull(),
  basePrice: numeric().notNull(),
  isActive: boolean().notNull().default(false),
});
