import { InferInsertModel, InferSelectModel, Table } from 'drizzle-orm'
import { PgTableWithColumns } from 'drizzle-orm/pg-core'
import { BuildRefine, createInsertSchema, createUpdateSchema, NoUnknownKeys } from 'drizzle-zod'

/* Export Types */
export type T_GetInsertModel<T extends PgTableWithColumns<any>> = InferInsertModel<T>
export type T_GetSelectModel<T extends PgTableWithColumns<any>> = InferSelectModel<T>

/* Export Zod Schema */
export function insertModelZodSchema<
  TTable extends Table,
  TRefine extends BuildRefine<
    Pick<TTable['_']['columns'], keyof TTable['$inferInsert']>,
    undefined
  >,
>(table: TTable, refine?: NoUnknownKeys<TRefine, TTable['$inferInsert']>) {
  return createInsertSchema(table, refine as any)
}

export function updateModelZodSchema<
  TTable extends Table,
  TRefine extends BuildRefine<
    Pick<TTable['_']['columns'], keyof TTable['$inferInsert']>,
    undefined
  >,
>(table: TTable, refine?: NoUnknownKeys<TRefine, TTable['$inferInsert']>) {
  return createUpdateSchema(table, refine as any)
}
