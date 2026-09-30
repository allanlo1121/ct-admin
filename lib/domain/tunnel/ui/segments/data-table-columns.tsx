"use client";


import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { TunnelSegmentRow } from "../../types";
export const tunnelSegmentColumns: ColumnDef<TunnelSegmentRow>[] = [
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
      <DataTableColumnHeader column={column} title="环段名称" />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("name") }</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "start_ring_no",
    header: ({ column }) => <DataTableColumnHeader column={column} title="起始环号" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("start_ring_no")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "end_ring_no",
    header: ({ column }) => <DataTableColumnHeader column={column} title="结束环号" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("end_ring_no")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
    {
    accessorKey: "ring_width",
    header: ({ column }) => <DataTableColumnHeader column={column} title="环宽" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("ring_width")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "outer_diameter",
    header: ({ column }) => <DataTableColumnHeader column={column} title="外径" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("outer_diameter")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "inner_diameter",
    header: ({ column }) => <DataTableColumnHeader column={column} title="内径" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("inner_diameter")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "thickness",
    header: ({ column }) => <DataTableColumnHeader column={column} title="厚度" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("thickness")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "remark",
    header: ({ column }) => <DataTableColumnHeader column={column} title="备注" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("remark")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
