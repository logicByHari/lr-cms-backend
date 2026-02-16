import { organizationSchema } from '$/organization/schema/organization.schema.js'
import { serviceSchema } from '$/service/schema/services.schema.js'
import { pgTable, uuid, integer, AnyPgColumn, timestamp } from 'drizzle-orm/pg-core'
import {
  insertModelZodSchema,
  T_GetInsertModel,
  T_GetSelectModel,
  updateModelZodSchema,
} from '@/modules/db/drizzle.types.js'

export const serviceBalanceSchema = pgTable('serviceBalances', {
  id: uuid().defaultRandom().primaryKey(),
  organizationId: uuid().references((): AnyPgColumn => organizationSchema.id),
  serviceId: uuid().references((): AnyPgColumn => serviceSchema.id),
  allowedPostPaidInvocatins: integer().notNull().default(0),
  availableNumberOfInvocations: integer().notNull().default(0),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
})

/* export types */
export type ICreateServiceBalance = T_GetInsertModel<typeof serviceBalanceSchema>
export type IUpdateServiceBalance = T_GetSelectModel<typeof serviceBalanceSchema>

/* export zod schema */
export const CreateServiceBalanceZodSchema = insertModelZodSchema(serviceBalanceSchema)
export const UpdateServiceBalanceZodSchema = updateModelZodSchema(serviceBalanceSchema)
