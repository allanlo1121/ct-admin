import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/core/utils";
import { TbmPickerItem } from "@/lib/domain/tbm/types";

import { usePathname } from "next/navigation";



export function TbmSidebarList({
  tbms,
  activeTbmId,
}: {
  tbms: TbmPickerItem[];
  activeTbmId?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="divide-y">
      {tbms.map((tbm) => {
        const href = pathname.replace(activeTbmId!, tbm.id);
        // console.log("Generated href for TBM", { tbmId: tbm.id, href });
        return (
          <Link
            key={tbm.id}
            href={href}
            className={cn("block px-4 py-3 transition-colors hover:bg-muted", {
              "bg-muted": tbm.id === activeTbmId,
            })}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{tbm.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{tbm.manageCode}</div>
              </div>

              {/* <Badge variant={tbm.status === "在线" ? "default" : "secondary"} className="shrink-0">
              {tbm.status}
            </Badge> */}
            </div>

            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              <div>{tbm.tbmTypeName}</div>
              <div>{tbm.manufacturerName}</div>
              <div>刀盘直径：{tbm.diameter}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
