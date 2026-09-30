"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { type TunnelListItem } from "../types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDateCN, formatDateTime } from "@/lib/utils";
import { routes } from "@/lib/core/routes";

export const tunnelColumns: ColumnDef<TunnelListItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="隧道名称" />
    ),
    cell: ({ row }) => {
      const tunnel = row.original
      const aliasName = tunnel.aliasName?.trim()
      return (
        <Link
          href={routes.tunnels.detail(tunnel.id!)}
          className="w-[200px]"
        >
          {tunnel.name}
          {aliasName && ` / ${aliasName}`}
        </Link>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "region",
    accessorFn: (row) => row.region?.name ?? "",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="所属片区" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">
        {row.original.region?.name ?? "-"}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "project",
    accessorFn: (row) => row.project?.name ?? "",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="所属工程" />
    ),
    cell: ({ row }) => (
      <div className="w-[180px]">
        {row.original.project?.name ?? "-"}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "section",
    accessorFn: (row) => row.section?.name ?? "",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="所属区间" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">
        {row.original.section?.name ?? "-"}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "prefix",
    header: ({ column }) => <DataTableColumnHeader column={column} title="隧道编号前缀" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("prefix")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "startChainage",
    header: ({ column }) => <DataTableColumnHeader column={column} title="起始里程" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("startChainage")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "endChainage",
    header: ({ column }) => <DataTableColumnHeader column={column} title="结束里程" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("endChainage")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "adjustment",
    header: ({ column }) => <DataTableColumnHeader column={column} title="长短链" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("adjustment")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "startRing",
    header: ({ column }) => <DataTableColumnHeader column={column} title="起始环号" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("startRing")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "endRing",
    header: ({ column }) => <DataTableColumnHeader column={column} title="结束环号" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("endRing")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "sortOrder",
    header: ({ column }) => <DataTableColumnHeader column={column} title="排序" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("sortOrder")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
