"use client";

import { toast } from "sonner";
import { Table } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useState } from "react";


import { syncTbmRealdataTable } from "@/lib/domain/tbm-config/repositories/client";

export function TbmRealdataTableButton({ tbmCode }: { tbmCode: string }) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    try {
      setPending(true);

      console.log("Generating real-time data table for TBM Code", tbmCode);

      const result =
        await syncTbmRealdataTable(tbmCode);

      if (!result.success) {
        toast.error(result.message ?? "生成实时数据表失败");
        return;
      }

      toast.success("实时数据表生成成功");
    } catch (error) {
      console.error(error);

      toast.error("生成实时数据表失败");
    } finally {
      setPending(false);
    }
  }

  return (
    <Button variant="outline" size="sm" disabled={pending} onClick={handleClick}>
      <Table className="size-4" />

      {pending ? "生成中..." : "生成实时表"}
    </Button>
  );
}
