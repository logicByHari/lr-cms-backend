import { serviceSchema } from '$/service/schema/services.schema';
import {
  pgTable,
  uuid,
  boolean,
  timestamp,
  numeric,
  AnyPgColumn,
} from 'drizzle-orm/pg-core';

export const paymentPlanSchema = pgTable('paymentPlans', {
  id: uuid().defaultRandom().primaryKey(),
  serviceId: uuid().references((): AnyPgColumn => serviceSchema.id),
  isDefault: boolean().default(false).notNull(),
  effectiveTo: timestamp(),
  effectiveFrom: timestamp(),
  pricePerInvocation: numeric().notNull(),
  isActive: boolean().default(false),
});
