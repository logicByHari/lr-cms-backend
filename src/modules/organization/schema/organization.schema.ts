import { userSchema } from '$/user/schema/user.schema';
import { discountSchema } from '$/discount/schema/discounts.schema';
import {
  pgTable,
  uuid,
  AnyPgColumn,
  text,
  integer,
  boolean,
  timestamp,
  numeric,
} from 'drizzle-orm/pg-core';

export const organizationSchema = pgTable('organizations', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  adminId: uuid().references((): AnyPgColumn => userSchema.id),
  discountId: uuid().references((): AnyPgColumn => discountSchema.id),
  name: text().notNull(),
  activeKey: text(),
  backupKey: text(),
  maxPaymentAllowed: numeric().notNull().default('1000'),
  isActive: boolean().notNull().default(false),
  allowedNumberOfUsers: integer().notNull().default(5),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});
