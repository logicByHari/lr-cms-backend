import { pgTable, uuid, numeric } from 'drizzle-orm/pg-core';

export const discountSchema = pgTable('discounts', {
  id: uuid().notNull().defaultRandom().primaryKey(),
  percentage: numeric().notNull(),
});
