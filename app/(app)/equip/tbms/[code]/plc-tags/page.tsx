import { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { PlcTagImportCard } from "./PlcTagImportCard";
import { listTbmPlcTagsByTbmCode } from "@/lib/domain/tbm-config/services";
import { ErrorBlock } from "@/components/common/error-block";
import { Suspense } from "react";
import { TableClient } from "@/lib/domain/tbm-config/components/plc-tag/table-client";
import { tbmPlcTagQuery } from "@/lib/domain/tbm-config/queries/plc-tag.query";
import { routes } from "@/lib/core/router/router";

export const metadata: Metadata = {
  title: "盾构-plc地址配置",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { code: tbmCode } = await params;

  const rawParams = tbmPlcTagQuery.parse(await searchParams);

  const queryParams = {
    ...rawParams,
    sortBy: rawParams.sortBy ?? "sortOrder",
  };

  let tbmPlcTag;

  try {
    tbmPlcTag = await listTbmPlcTagsByTbmCode(tbmCode, queryParams);
  } catch (error) {
    console.error("Error fetching TBM PLC tags:", error);
    return <ErrorBlock message={error instanceof Error ? error.message : "查询失败"} />;
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <PageHeader title="盾构-PLC地址配置" backHref={routes.tbms.list} />

      <PlcTagImportCard tbmCode={tbmCode} />

      {/* 表格 */}

      <Suspense key={queryParams.search ?? "" + queryParams.page}>
        <TableClient
          items={tbmPlcTag.items}
          total={tbmPlcTag.total}
          page={queryParams.page}
          pageSize={queryParams.pageSize}
          sortBy={queryParams.sortBy}
          sortDirection={queryParams.sortDirection}
        />
      </Suspense>
    </div>
  );
}
