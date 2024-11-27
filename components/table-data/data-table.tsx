'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useModal, ModalIds } from '@/utils/contexts/modal-context'

import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'


import { TableFilterControls } from './table-header'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  categories: any
}

export function DataTable<TData, TValue>({
  columns,
  data,
  categories,
}: DataTableProps<TData, TValue>) {
  const router = useRouter()
  /* SORTING, FILTERING, and VISIBILITY state */
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const { modals, openModal, closeModal } = useModal()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    /* SORTING */
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    /* FILTERING */
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  const handleRowClick = (expense) => {
    openModal(ModalIds.expenseModal, expense)
  }

  return (
    // Table container
    <div className='rounded-md col-span-full border p-3'>

        <TableFilterControls table={table} categories={categories} />

      <div className='table-wrapper'>
        <Table className='overflow-auto'>
          <TableHeader className='bg-muted'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='rounded-lg'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='px-4'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => handleRowClick(row.original)}
                  className='cursor-pointer'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='first:pl-4 last:pr-4'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
