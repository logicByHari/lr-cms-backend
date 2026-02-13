import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  AnyPgColumn,
  boolean,
} from 'drizzle-orm/pg-core';
import { UserRoleEnum } from '../user.enum';
import { organizationSchema } from '$/organization/schema/organization.schema';

export const userRoleEnum = pgEnum('userRoleEnum', UserRoleEnum);

export const userSchema = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  role: userRoleEnum().notNull(),
  name: text().notNull(),
  email: text().notNull(),
  password: text().notNull(),
  organizationId: uuid().references((): AnyPgColumn => organizationSchema.id),
  isActive: boolean().notNull().default(false),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});
