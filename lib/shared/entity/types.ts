export type EntityRef = {
    id: string
    name: string
}


export type AuditFields = {
    createdAt: string | null
    createdBy: string | null
    updatedAt: string | null
    updatedBy: string | null
    deletedAt: string | null
    deletedBy: string | null
}


export const tableEntities = [
    "organization",
    "employee",
    "project",
    "section",
    "tunnel",
    "tbm",
    // "tbm_parameter_configs",
] as const ;

export type TableEntity = (typeof tableEntities)[number];
