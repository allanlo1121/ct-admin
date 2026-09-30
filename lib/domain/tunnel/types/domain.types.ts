
import { OrganizationRef } from "@/lib/domain/organization/types/";
import { ProjectRef } from "@/lib/domain/project/types";
import { MasterDataRef } from "@/lib/domain/master-data/types";
import { AuditFields } from "@/lib/shared/entity/";

import { SectionRef } from "@/lib/domain/section/types";


export const advanceDirection = ["chainageIncrease", "chainageDecrease"] as const;
export type AdvanceDirection = (typeof advanceDirection)[number];

export type TunnelBase = {
    id: string;
    name: string;
    aliasName: string | null;
    prefix: string | null;
    startChainage: number;
    endChainage: number;
    adjustment: number;
}

export type TunnelListItem = TunnelBase & {


    project: ProjectRef;
    region: MasterDataRef;
    section: SectionRef;


    remark: string | null;
    sortOrder: number;
    isDisabled: boolean;
};

export type TunnelDetail = TunnelListItem

// export type TunnelInsertItem = Camelize<TunnelInsertRow>;
