import { serviceSchema } from '$/service/schema/services.schema.js'
import { pgTable, uuid, boolean, timestamp, numeric, AnyPgColumn } from 'drizzle-orm/pg-core'
import {
  insertModelZodSchema,
  T_GetInsertModel,
  T_GetSelectModel,
  updateModelZodSchema,
} from '@/modules/db/drizzle.types.js'

export const paymentPlanSchema = pgTable('paymentPlans', {
  id: uuid().defaultRandom().primaryKey(),
  serviceId: uuid().references((): AnyPgColumn => serviceSchema.id),
  isDefault: boolean().default(false).notNull(),
  effectiveTo: timestamp(),
  effectiveFrom: timestamp(),
  pricePerInvocation: numeric().notNull(),
  isActive: boolean().default(false),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
})

/* export types */
export type ICreatePaymentPlan = T_GetInsertModel<typeof paymentPlanSchema>
export type IUpdatePaymentPlan = T_GetSelectModel<typeof paymentPlanSchema>

/* export zod schema */
export const CreatePaymentPlanZodSchema = insertModelZodSchema(paymentPlanSchema)
export const UpdatePaymentPlanZodSchema = updateModelZodSchema(paymentPlanSchema)
