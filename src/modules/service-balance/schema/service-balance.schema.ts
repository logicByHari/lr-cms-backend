import { organizationSchema } from '@/modules/organization/schema/organization.schema';
import { serviceSchema } from '@/modules/service/schema/services.schema';
import { pgTable, uuid, integer, AnyPgColumn } from 'drizzle-orm/pg-core';

export const serviceBalances = pgTable('serviceBalances', {
  id: uuid().defaultRandom().primaryKey(),
  organizationId: uuid().references((): AnyPgColumn => organizationSchema.id),
  serviceId: uuid().references((): AnyPgColumn => serviceSchema.id),
  allowedPostPaidInvocatins: integer().notNull().default(0),
  availableNumberOfInvocations: integer().notNull().default(0),
});
