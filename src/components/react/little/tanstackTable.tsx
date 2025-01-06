import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";

// 定义数据类型
type Person = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: "active" | "inactive";
  progress: number;
};

// 模拟数据
const makeData = (): Person[] => {
  return Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    firstName: `名字${index}`,
    lastName: `姓${index}`,
    age: Math.floor(Math.random() * 50) + 20,
    visits: Math.floor(Math.random() * 100),
    status: Math.random() > 0.5 ? "active" : "inactive",
    progress: Math.floor(Math.random() * 100),
  }));
};

export default function TanStackTableDemo() {
  // 使用 useEffect 来处理客户端数据生成
  const [data, setData] = useState<Person[]>([]);

  useEffect(() => {
    setData(makeData());
  }, []);

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // 定义列
  const columns: ColumnDef<Person>[] = [
    {
      header: "基本信息",
      columns: [
        {
          accessorKey: "id",
          header: "ID",
          size: 60,
        },
        {
          accessorKey: "firstName",
          header: "名",
        },
        {
          accessorKey: "lastName",
          header: "姓",
        },
      ],
    },
    {
      header: "详细信息",
      columns: [
        {
          accessorKey: "age",
          header: "年龄",
          size: 80,
        },
        {
          accessorKey: "visits",
          header: "访问次数",
        },
        {
          accessorKey: "status",
          header: "状态",
          cell: ({ row }) => (
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                row.original.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {row.original.status}
            </span>
          ),
        },
        {
          accessorKey: "progress",
          header: "进度",
          cell: ({ row }) => (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${row.original.progress}%` }}
              ></div>
            </div>
          ),
        },
      ],
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 bg-gray-900 text-gray-100">
      {/* 搜索框 */}
      <div className="mb-4">
        <input
          type="text"
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="全局搜索..."
          className="px-4 py-2 border rounded-lg bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
        />
      </div>

      {/* 表格 */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-700">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border border-gray-700 p-2 bg-gray-800"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none hover:text-blue-400"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-800">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="border border-gray-700 p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页控件 */}
      <div className="mt-4 flex items-center justify-between">
        <div className="space-x-2">
          <button
            className="px-4 py-2 border border-gray-700 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="px-4 py-2 border border-gray-700 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="px-4 py-2 border border-gray-700 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="px-4 py-2 border border-gray-700 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        <span className="flex items-center gap-1 text-gray-300">
          <div>第 {table.getState().pagination.pageIndex + 1} 页,</div>
          <div>共 {table.getPageCount()} 页</div>
        </span>
      </div>
    </div>
  );
}
