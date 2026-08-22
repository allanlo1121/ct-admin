"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { TbmParameterListRow } from "../../types";

export const columns: ColumnDef<TbmParameterListRow>[] = [
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
    accessorKey: "parameter_code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="参数编码" />,
    cell: ({ row }) => {
      const tbm = row.original;
      return <div className="w-full text-lg  text-center items-center">{tbm.parameter_code}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "parameter_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="参数名称" />,
    cell: ({ row }) => {
      const tbm = row.original;
      return <div className="w-full text-lg  text-center items-center">{tbm.parameter_name}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "subsystem_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="子系统名称" />,
    cell: ({ row }) => {
      const tbm = row.original;
      return <div className="w-full text-lg  text-center items-center">{tbm.subsystem_name}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "data_type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="数据类型" />,
    cell: ({ row }) => <div className="w-full text-lg  text-center items-center">{row.getValue("data_type")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "unit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="数据单位" />,
    cell: ({ row }) => <div className="w-full text-lg  text-center items-center">{row.getValue("unit")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "sortOrder",
    header: ({ column }) => <DataTableColumnHeader column={column} title="排序顺序" />,
    cell: ({ row }) => <div className="w-full text-lg  text-center items-center">{row.getValue("sortOrder")}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
