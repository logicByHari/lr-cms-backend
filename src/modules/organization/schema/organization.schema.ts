import { userSchema } from '$/user/schema/user.schema.js'
import { discountSchema } from '$/discount/schema/discounts.schema.js'
import {
  pgTable,
  uuid,
  AnyPgColumn,
  text,
  integer,
  boolean,
  timestamp,
  numeric,
} from 'drizzle-orm/pg-core'
import {
  insertModelZodSchema,
  T_GetInsertModel,
  T_GetSelectModel,
  updateModelZodSchema,
} from '@/modules/db/drizzle.types.js'

export const organizationSchema = pgTable('organizations', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  adminId: uuid().references((): AnyPgColumn => userSchema.id),
  discountId: uuid().references((): AnyPgColumn => discountSchema.id),
  name: text().notNull(),
  activeKey: text(),
  backupKey: text(),
  maxPaymentAllowed: numeric().notNull().default('1000'),
  isActive: boolean().notNull().default(false),
  allowedNumberOfUsers: integer().notNull().default(5),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
})

/* export types */
export type ICreateOrganization = T_GetInsertModel<typeof organizationSchema>
export type IUpdateOrganization = T_GetSelectModel<typeof organizationSchema>

/* export zod schema */
export const CreateOrganizationZodSchema = insertModelZodSchema(organizationSchema)
export const UpdateOrganizationZodSchema = updateModelZodSchema(organizationSchema)
