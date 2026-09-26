// section.constants.ts

import type { LineMode, SectionType } from "./types"

export const sectionTypeLabels: Record<SectionType, string> = {
    station: "车站",
    tunnel: "隧道",
    depot: "车辆段",
    other: "其他",
}


export const lineModeLabels: Record<LineMode, string> = {
    single: "单线",
    double: "双线",
}