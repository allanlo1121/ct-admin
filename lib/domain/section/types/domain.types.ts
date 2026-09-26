import { OrganizationRef } from "@/lib/domain/organization/types/";
import { ProjectRef } from "@/lib/domain/project/types";
import { MasterDataRef } from "@/lib/domain/master-data/types";
import { AuditFields, EntityRef } from "@/lib/shared/entity/";

export const sectionTypes = ["station", "tunnel", "depot", "other"] as const;
export type SectionType = (typeof sectionTypes)[number];


export const lineModes = ["single", "double"] as const;

export type LineMode = (typeof lineModes)[number];

export type SectionRef = EntityRef;


export type SectionBase = {
    id: string
    name: string
    shortName: string | null
    type: SectionType
    lineMode: LineMode | null
}


export type SectionListItem = SectionBase & {

    organization: OrganizationRef;
    project: ProjectRef;


    region: MasterDataRef;
    remark: string | null;
    sortOrder: number;
    isDisabled: boolean;
}

export type Section = SectionBase & AuditFields & {

    projectId: string;

    sortOrder: number;
    isDisabled: boolean;
    remark: string | null;


}

