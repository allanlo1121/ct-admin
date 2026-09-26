// export type EmployeeListItem = {
//   id: string;
//   name: string;
//   code: string | null;
//   organizationId: string | null;
//   organizationName: string | null;
//   statusName: string | null;

import { RemoveNull } from "@/lib/utils/remove-nullable";
import { ProjectListRow } from "./db.types";
import { Camelize } from "@/lib/utils/case-converter";
import { EntityRef } from "@/lib/shared/entity";

//   sortOrder: number;
//   createdAt: string;
// };

export type ProjectListItem = Camelize<ProjectListRow>;


export type ProjectRef = EntityRef;
