import { organizationSchema } from '@/modules/organization/schema/organization.schema';
import {
  pgTable,
  uuid,
  AnyPgColumn,
  numeric,
  integer,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { PaymentStatusEnum } from '../payment.enum';
import { paymentPlanSchema } from '$/payment-plan/schema/payment-plan.schema';

export const paymentStatusEnum = pgEnum('paymentStatusEnum', PaymentStatusEnum);

export const payments = pgTable('payments', {
  id: uuid().defaultRandom().primaryKey(),
  organizationId: uuid().references((): AnyPgColumn => organizationSchema.id),
  amount: numeric().notNull(),
  paymentPlanId: uuid().references((): AnyPgColumn => paymentPlanSchema.id),
  numberOfInvocations: integer().notNull(),
  status: paymentStatusEnum().notNull(),
});
