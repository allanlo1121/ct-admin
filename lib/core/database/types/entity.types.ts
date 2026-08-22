import { Database } from "@/lib/infra/supabase/types";

export type SchemaName = keyof Database;
export type TableName<S extends SchemaName> = keyof Database[S]["Tables"];

export type TableKey<S extends keyof Database, T extends keyof Database[S]["Tables"]> = {
  schema: S;
  table: T;
};

export function createTable<S extends keyof Database, T extends keyof Database[S]["Tables"]>(
  schema: S,
  table: T
) {
  return { schema, table } as const;
}

type HrTables = keyof Database["hr"]["Tables"];
type ProjTables = keyof Database["proj"]["Tables"];
type EqpTables = keyof Database["eqp"]["Tables"];
type TbmTables = keyof Database["tbm"]["Tables"];

export const tableEntities = [
  "organizations",
  "employees",
  "projects",
  "tunnels",
  "tbms",
  // "tbm_parameter_configs",
] as const satisfies readonly (HrTables | ProjTables | EqpTables | TbmTables)[];

export type TableEntity = (typeof tableEntities)[number];

export type BaseSystemFields =
  | "id"
  | "created_at"
  | "created_by"
  | "updated_at"
  | "updated_by"
  | "deleted_at"
  | "deleted_by";



export type SoftDeleteTable = "organizations" | "employees" | "projects" | "tbms";
