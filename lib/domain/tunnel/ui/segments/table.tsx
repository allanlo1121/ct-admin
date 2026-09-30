"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { TunnelSegmentRow } from "../../types"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { SegmentRow } from "./segment-row"
import { SegmentRowForm } from "./segment-row-form"



export function SegmentTable({
    tunnelId,
    segments,
}: {
    tunnelId: string
    segments: TunnelSegmentRow[]
}) {
    const [isCreating, setIsCreating] =
        useState(false)

    const nextStartRingNo =
        segments.length > 0
            ? Math.max(
                ...segments.map(
                    (segment) => segment.end_ring_no
                )
            ) + 1
            : 1

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>环段配置</CardTitle>
                    <CardDescription>
                        配置隧道不同环段的环号范围及管片参数。
                    </CardDescription>
                </div>

                <Button
                    size="sm"
                    disabled={isCreating}
                    onClick={() => setIsCreating(true)}
                >
                    <Plus className="size-4" />
                    新增环段
                </Button>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>起始环号</TableHead>
                            <TableHead>结束环号</TableHead>
                            <TableHead>环宽</TableHead>
                            <TableHead>内径</TableHead>
                            <TableHead>外径</TableHead>
                            <TableHead>厚度</TableHead>
                            <TableHead>备注</TableHead>
                            <TableHead className="text-right">
                                操作
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {segments.map((segment) => (
                            <SegmentRow
                                key={segment.id}
                                segment={segment}
                            />
                        ))}

                        {isCreating && (
                            <SegmentRowForm
                                tunnelId={tunnelId}
                                defaultStartRingNo={nextStartRingNo}
                                onCancel={() =>
                                    setIsCreating(false)
                                }
                                onSuccess={() =>
                                    setIsCreating(false)
                                }
                            />
                        )}

                        {segments.length === 0 &&
                            !isCreating && (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        暂无环段配置
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}