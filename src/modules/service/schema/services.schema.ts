import { pgTable, uuid, text, numeric, boolean, timestamp } from 'drizzle-orm/pg-core'
import {
  insertModelZodSchema,
  T_GetInsertModel,
  T_GetSelectModel,
  updateModelZodSchema,
} from '@/modules/db/drizzle.types.js'

export const serviceSchema = pgTable('services', {
  id: uuid().defaultRandom().notNull().primaryKey(),
  name: text().notNull(),
  basePrice: numeric().notNull(),
  isActive: boolean().notNull().default(false),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
})

/* export types */
export type ICreateService = T_GetInsertModel<typeof serviceSchema>
export type IUpdateService = T_GetSelectModel<typeof serviceSchema>

/* export zod schema */
export const CreateServiceZodSchema = insertModelZodSchema(serviceSchema)
export const UpdateServiceZodSchema = updateModelZodSchema(serviceSchema)
