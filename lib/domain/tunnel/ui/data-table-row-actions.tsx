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

import { deleteTunnelAction } from "../actions";
import { TunnelListItem } from "../types";
import { routes } from "@/lib/core/routes";
import { toast } from "sonner";



interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TunnelListItem>) {
  const tunnel = row.original as unknown as TunnelListItem;
  const router = useRouter();


  async function handleDelete() {
    if (!confirm("确认删除该隧道吗？")) return;

    try {
      await deleteTunnelAction(tunnel.id!);

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
          <DropdownMenuItem onClick={() => router.push(routes.tunnels.edit(tunnel.id!))}>
            编辑隧道
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
            删除隧道
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </>
  );
}
