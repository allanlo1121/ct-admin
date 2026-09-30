import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
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

import { segmentRepository } from "@/lib/domain/tunnel/repositories"
import { SegmentDrawer } from "@/lib/domain/tunnel/ui/segments/segment-drawer"

type PageProps = {
    params: Promise<{
        id: string
    }>
}

export default async function TunnelSegmentsPage({
    params,
}: PageProps) {
    const { id } = await params

    const segments = await segmentRepository.findByTunnelId(id)

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>环段配置</CardTitle>
                    <CardDescription>
                        配置隧道不同环段的环号范围及管片环宽。
                    </CardDescription>
                </div>

                <SegmentDrawer tunnelId={id} />
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>起始环号</TableHead>
                            <TableHead>结束环号</TableHead>
                            <TableHead>环宽</TableHead>
                            <TableHead className="w-[100px] text-right">
                                操作
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {segments.length > 0 ? (
                            segments.map((segment) => (
                                <TableRow key={segment.id}>
                                    <TableCell className="font-medium">
                                        {segment.start_ring_no}
                                    </TableCell>

                                    <TableCell>
                                        {segment.end_ring_no}
                                    </TableCell>

                                    <TableCell>
                                        {segment.ring_width.toFixed(3)} m
                                    </TableCell>

                                    <TableCell>
                                        {segment.inner_diameter} m
                                    </TableCell>
                                    <TableCell>
                                        {segment.outer_diameter} m
                                    </TableCell>
                                    <TableCell>
                                        {segment.thickness} m
                                    </TableCell>
                                <TableCell>
                                        {segment.remark}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                        >
                                            编辑
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
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