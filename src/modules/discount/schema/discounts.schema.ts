import { pgTable, uuid, numeric, timestamp } from 'drizzle-orm/pg-core'
import {
  insertModelZodSchema,
  T_GetInsertModel,
  T_GetSelectModel,
  updateModelZodSchema,
} from '@/modules/db/drizzle.types.js'

export const discountSchema = pgTable('discounts', {
  id: uuid().notNull().defaultRandom().primaryKey(),
  percentage: numeric().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
})

/* export types */
export type ICreateDiscount = T_GetInsertModel<typeof discountSchema>
export type IUpdateDiscount = T_GetSelectModel<typeof discountSchema>

/* export zod schema */
export const CreateDiscountZodSchema = insertModelZodSchema(discountSchema)
export const UpdateDiscountZodSchema = updateModelZodSchema(discountSchema)
