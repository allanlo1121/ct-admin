import { ArrowLeft } from "lucide-react";
import { tunnelRepository } from "@/lib/domain/tunnel/repositories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { routes } from "@/lib/core/routes";
import { Button } from "@/components/ui/button";
import { DetailItem } from "@/components/detail-item";

import { notFound } from "next/navigation";

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const tunnel = await tunnelRepository.findDetailById(id);

  if (!tunnel) {
    notFound()
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          {/* <h1 className="text-2xl font-bold">{tunnel.name}</h1> */}
          {/* <p className="text-muted-foreground">{tunnel.tunnelStatusName}</p> */}
        </div>

        <Link href={routes.tunnels.edit(id)}>
          <Button>编辑</Button>
        </Link>
      </div>
 
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          {/* <DetailItem label="所在机构" value={tunnel.organizationName} /> */}
          <DetailItem label="项目名称" value={tunnel.project.name} />

          <DetailItem label="描述" value={tunnel.remark} />
        </CardContent>
      </Card>
      {/* 组织关系 */}
      <Card>
        <CardHeader>
          <CardTitle>区间规格</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4">
          {/* <DetailItem label="起始环" value={tunnel.startRing} />
          <DetailItem label="结束环" value={tunnel.endRing} /> */}
          <DetailItem label="起始里程" value={tunnel.startChainage} />
          <DetailItem label="结束里程" value={tunnel.endChainage} />
          <DetailItem label="长短链" value={tunnel.adjustment} />
          <DetailItem label="隧道长度" value={tunnel.endChainage - tunnel.startChainage + tunnel.adjustment} />
        </CardContent>
      </Card>


    </div>
  );
}
