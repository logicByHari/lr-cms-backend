import { organizationSchema } from '$/organization/schema/organization.schema.js'
import {
  pgTable,
  uuid,
  AnyPgColumn,
  numeric,
  integer,
  pgEnum,
  timestamp,
} from 'drizzle-orm/pg-core'
import { PaymentStatusEnum } from '../payment.enum.js'
import { paymentPlanSchema } from '$/payment-plan/schema/payment-plan.schema.js'
import {
  insertModelZodSchema,
  T_GetInsertModel,
  T_GetSelectModel,
  updateModelZodSchema,
} from '@/modules/db/drizzle.types.js'

export const paymentStatusEnum = pgEnum('paymentStatusEnum', PaymentStatusEnum)

export const paymentSchema = pgTable('payments', {
  id: uuid().defaultRandom().primaryKey(),
  organizationId: uuid().references((): AnyPgColumn => organizationSchema.id),
  amount: numeric().notNull(),
  paymentPlanId: uuid().references((): AnyPgColumn => paymentPlanSchema.id),
  numberOfInvocations: integer().notNull(),
  status: paymentStatusEnum().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
})

/* export types */
export type ICreatePayment = T_GetInsertModel<typeof paymentSchema>
export type IUpdatePayment = T_GetSelectModel<typeof paymentSchema>

/* export zod schema */
export const CreatePaymentZodSchema = insertModelZodSchema(paymentSchema)
export const UpdatePaymentZodSchema = updateModelZodSchema(paymentSchema)
