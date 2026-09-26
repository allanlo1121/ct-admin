"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { type SectionListItem } from "../types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { routes } from "@/lib/shared/entity/routes";

import { sectionTypeLabels } from "../constants";

export const sectionColumns: ColumnDef<SectionListItem>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="隧道名称" />,
    cell: ({ row }) => {
      const section = row.original;
      return (
        <Link href={routes.section.detail(section.id!)} className="w-[80px]">
          {section.name}
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "shortName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="隧道简称" />,
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("shortName")}</div>,
    enableSorting: false,
    enableHiding: true,
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
    <div className="w-[120px]">
      {row.original.project?.name ?? "-"}
    </div>
  ),
  enableSorting: true,
  enableHiding: true,
},
  {
  accessorKey: "type",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="工点类型" />
  ),
  cell: ({ row }) => (
    <div className="w-[120px]">
      {sectionTypeLabels[row.original.type]}
    </div>
  ),
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
    accessorKey: "isDisabled",
    header: ({ column }) => <DataTableColumnHeader column={column} title="是否禁用" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("isDisabled") ? "是" : "否"}</div>,
    enableSorting: false,
    enableHiding: true,
  },


  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
