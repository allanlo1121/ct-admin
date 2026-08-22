import { Metadata } from "next";

import { TbmHeaderCard } from "./TbmHeaderCard";
import { TbmParameterImportButton } from "./_components/TbmParameterImportButton";

import { fetchTbmDetailByCode } from "@/lib/domain/tbm/services";
import { ErrorBlock } from "@/components/common/error-block";
import { Suspense } from "react";
import { TableClient } from "@/lib/domain/tbm-config/components/tbm-parameters/table-client";
import { tbmParametersQuery } from "@/lib/domain/tbm-config/queries";
import { Button } from "@/components/ui/button";
import { Pencil, Settings } from "lucide-react";
import { TbmRealdataTableButton } from "./_components/TbmRealdataTableButton";
import { tbmParametersRepository } from "@/lib/domain/tbm-config/repositories";

export const metadata: Metadata = {
  title: "盾构-运行参数配置",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { code: tbmCode } = await params;

  console.log("===TbmParameterConfigPage===");
  console.log("tbmCode", tbmCode);

  const rawParams = tbmParametersQuery.parse(await searchParams);

  const queryParams = {
    ...rawParams,
    sortBy: rawParams.sortBy ?? "sortOrder",
  };

  let tbmParameters;
  let tbmDetail;

  try {
    tbmDetail = await fetchTbmDetailByCode(tbmCode);
    tbmParameters = await tbmParametersRepository.paginateByTbmCode(tbmCode, queryParams);
    console.log("tbmParameters", tbmParameters);
  } catch (error) {
    console.error("Error fetching TBM parameter configs:", error);
    return <ErrorBlock message={error instanceof Error ? error.message : "查询失败"} />;
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <TbmHeaderCard
        tbm={tbmDetail}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Pencil className="size-4" />
              编辑
            </Button>

            <Button variant="outline" size="sm">
              <Settings className="size-4" />
              配置
            </Button>

            <TbmParameterImportButton tbmCode={tbmCode} />
            <TbmRealdataTableButton tbmCode={tbmCode} />
          </>
        }
      />

      {/* <TbmParameterConfigImportCard tbmId={tbmCode} /> */}

      {/* 表格 */}

      <Suspense key={`${tbmCode}-${queryParams.search ?? ""}-${queryParams.page}`}>
        <TableClient
          items={tbmParameters.items}
          total={tbmParameters.total}
          page={queryParams.page}
          pageSize={queryParams.pageSize}
          sortBy={queryParams.sortBy}
          sortDirection={queryParams.sortDirection}
        />
      </Suspense>
    </div>
  );
}
