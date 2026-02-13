import { pgTable, uuid, text, timestamp, pgEnum, AnyPgColumn, boolean } from 'drizzle-orm/pg-core'
import { UserRoleEnum } from '../user.enum.js'
import { organizationSchema } from '$/organization/schema/organization.schema.js'
import {
  insertModelZodSchema,
  T_GetInsertModel,
  T_GetSelectModel,
  updateModelZodSchema,
} from '@/modules/db/drizzle.types.js'

export const userRoleEnum = pgEnum('userRoleEnum', UserRoleEnum)

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
})

/* export types */
export type ICreateUser = T_GetInsertModel<typeof userSchema>
export type IUpdateUser = T_GetSelectModel<typeof userSchema>

/* export zod schema */
export const CreateUserZodSchema = insertModelZodSchema(userSchema)
export const UpdateUserZodSchema = updateModelZodSchema(userSchema)
