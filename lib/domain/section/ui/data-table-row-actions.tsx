"use client";

import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteSectionAction } from "../actions";
import {SectionListItem } from "../types";
import { routes } from "@/lib/core/router/router";
import { toast } from "sonner";
import { useState } from "react";


interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<SectionListItem>) {
  const section = row.original as unknown as SectionListItem;
  const router = useRouter();

  const [statusTimelineOpen, setStatusTimelineOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  async function handleDelete() {
    if (!confirm("确认删除该工点吗？")) return;

    try {
      const result = await deleteSectionAction(section.id!);

   
      toast.success("删除成功");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("删除失败");
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 data-[state=open]:bg-muted">
            <MoreHorizontal />
            <span className="sr-only">打开操作菜单</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuItem onClick={() => router.push(routes.sections.edit(section.id!))}>
            编辑工点
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setStatusTimelineOpen(true);
            }}
          >
            修改施工状态
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setScheduleOpen(true);
            }}
          >
            调整计划日期
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* ===== 所属片区切换 ===== */}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            删除工点
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </>
  );
}
