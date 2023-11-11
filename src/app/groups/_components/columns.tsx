"use client";

import { DataTableColumnHeader } from "@/app/groups/_components/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Group } from "@/models/group.model";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Group>[] = [
  {
    accessorKey: "description",
    meta: {
      label: "Nome",
    },
    header: ({ column }) => (
      <DataTableColumnHeader className="pl-2" column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      return (
        <p className="pl-2 truncate max-w-xs">{row.getValue("description")}</p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    meta: {
      label: "Criado em",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criado em" />
    ),
    cell: ({ row }) => {
      return (
        <span>
          {new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short",
          }).format(new Date(row.getValue("createdAt")))}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="w-full flex justify-end px-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-4 h-4 p-0">
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <span>Editar</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Excluir</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
