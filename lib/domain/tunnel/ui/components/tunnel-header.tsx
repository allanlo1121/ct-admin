import Link from "next/link"
import { ArrowLeft, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { routes } from "@/lib/core/routes"
import { TunnelDetail} from "../../types"

type TunnelHeaderProps = {
    tunnel: TunnelDetail
}

function formatChainage(value: number) {
    const km = Math.floor(value / 1000)
    const meter = value % 1000

    return `K${km}+${meter.toFixed(3).padStart(7, "0")}`
}

export default function TunnelHeader({ tunnel }: TunnelHeaderProps) {
    const aliasName = tunnel.aliasName?.trim()

    const hasChainage =
        tunnel.startChainage !== 0 || tunnel.endChainage !== 0

    return (
        <div className="space-y-4">
            <Button variant="ghost" size="sm" asChild className="-ml-2">
                <Link href={routes.tunnels.list}>
                    <ArrowLeft className="size-4" />
                    隧道管理
                </Link>
            </Button>

            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {tunnel.name}
                        {aliasName && (
                            <span className="text-muted-foreground">
                                {" / "}
                                {aliasName}
                            </span>
                        )}
                    </h1>

                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        {tunnel.section.name && <span>{tunnel.section.name}</span>}

                        {tunnel.section.name && hasChainage && <span>·</span>}

                        {hasChainage && (
                            <span>
                                {formatChainage(tunnel.startChainage)}
                                {" ～ "}
                                {formatChainage(tunnel.endChainage)}
                            </span>
                        )}
                    </div>
                </div>

                <Button variant="outline" size="sm" asChild>
                    <Link href={routes.tunnels.edit(tunnel.id)}>
                        <Pencil className="size-4" />
                        编辑基本信息
                    </Link>
                </Button>
            </div>
        </div>
    )
}