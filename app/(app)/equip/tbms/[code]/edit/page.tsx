import { fetchTbmByCode } from "@/lib/domain/tbm/services";

import { UpdateTbm } from "@/lib/domain/tbm/components/forms";
import { ErrorBlock } from "@/components/common/error-block";

export default async function Page({ params }: { params: Promise<{ code: string }> }) {

  const { code } = await params;

  let tbm;

  try {
    tbm = await fetchTbmByCode(code);
  } catch (error) {
    console.error("Error fetching TBM:", error);
    return <ErrorBlock message={error instanceof Error ? error.message : "查询失败"} />;
  }

  return (
    <main>
      <UpdateTbm title="编辑TBM" description="TBM信息" initialValues={tbm} />
    </main>
  );
}
