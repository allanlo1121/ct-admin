"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "cn"
import { routes } from "@/lib/core/routes"

type TunnelNavProps = {
    tunnelId: string
}

export default function TunnelNav({ tunnelId }: TunnelNavProps) {
    const pathname = usePathname()

    const items = [
        {
            title: "概览",
            href: routes.tunnels.detail(tunnelId),
            exact: true,
        },
        {
            title: "基本信息",
            href: routes.tunnels.edit(tunnelId),
        },
        {
            title: "管片",
            href: routes.tunnels.segments(tunnelId),
        },
        {
            title: "状态",
            href: routes.tunnels.status(tunnelId),
        },
        {
            title: "计划",
            href: routes.tunnels.plans(tunnelId),
        },
        {
            title: "风险",
            href: routes.tunnels.risks(tunnelId),
        },
    ]

    return (
        <nav className="border-b">
            <div className="flex gap-6">
                {items.map((item) => {
                    const active = item.exact
                        ? pathname === item.href
                        : pathname.startsWith(item.href)

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative pb-3 text-sm font-medium transition-colors",
                                active
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {item.title}

                            {active && (
                                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground" />
                            )}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}