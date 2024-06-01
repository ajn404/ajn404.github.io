import { useState } from "react";

// 定义类型

export interface Column {
  header: string;
  accessor: string;
}

export interface Row {
  [key: string]: any;
}

export interface TableOptions {
  className?: string;
}

export interface OptionConfig {
  label: string;
  name: string;
  type: "text" | "number" | "select";
  value: string | number;
  options?: Array<{ label: string; value: string | number }>; // Only for select type
}

export interface TableState {
  selectedRows: Set<number>;
  allSelected: boolean;
}

interface UseTableOptions {
  columns: Column[];
  data: Row[];
}

//使用 useTable hook 来管理表格的状态和渲染逻辑。
//在 useTable Hook 中增加管理选中状态的逻辑
//通过 state 管理选中的行和全选状态。

export const useTable = ({ columns, data }: UseTableOptions) => {
  const [rows, setRows] = useState<Row[]>(data);
  const [state, setState] = useState<TableState>({
    selectedRows: new Set<number>(),
    allSelected: false,
  });

  const toggleRowSelection = (index: number) => {
    setState(prevState => {
      const selectedRows = new Set(prevState.selectedRows);
      if (selectedRows.has(index)) {
        selectedRows.delete(index);
      } else {
        selectedRows.add(index);
      }
      return {
        ...prevState,
        selectedRows,
        allSelected: selectedRows.size === rows.length,
      };
    });
  };

  const toggleAllSelection = () => {
    setState(prevState => {
      const allSelected = !prevState.allSelected;
      const selectedRows = allSelected
        ? new Set(rows.map((_, index) => index))
        : new Set<number>();
      return { ...prevState, selectedRows, allSelected };
    });
  };

  const getTableProps = () => ({
    // Add additional table props here
  });

  const getHeaderProps = () => ({
    // Add additional header props here
  });

  const getRowProps = (row: Row, index: number) => ({
    // Add additional row props here
    key: index,
  });

  const getCellProps = (cell: any) => ({
    // Add additional cell props here
  });

  return {
    rows,
    columns,
    state,
    toggleRowSelection,
    toggleAllSelection,
    getTableProps,
    getHeaderProps,
    getRowProps,
    getCellProps,
  };
};

// 在表头和每一行中添加复选框。
// 使用 toggleAllSelection 方法处理全选逻辑。
// 使用 toggleRowSelection 方法处理行选中逻辑。

interface TableProps {
  columns: Column[];
  data: Row[];
  options: TableOptions;
}

const Table: React.FC<TableProps> = ({ columns, data, options }) => {
  const {
    rows,
    state,
    toggleRowSelection,
    toggleAllSelection,
    getTableProps,
    getHeaderProps,
    getRowProps,
    getCellProps,
  } = useTable({ columns, data });

  return (
    <table className={options?.className || ""} {...getTableProps()}>
      <thead>
        <tr {...getHeaderProps()}>
          <th>
            <input
              type="checkbox"
              checked={state.allSelected}
              onChange={toggleAllSelection}
            />
          </th>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} {...getRowProps(row, rowIndex)}>
            <td>
              <input
                type="checkbox"
                checked={state.selectedRows.has(rowIndex)}
                onChange={() => toggleRowSelection(rowIndex)}
              />
            </td>
            {columns.map((col, colIndex) => (
              <td key={colIndex} {...getCellProps(row[col.accessor])}>
                {row[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// 管理表格数据和选项的状态。
// 将初始数据和列配置传递给 Table 组件。
// 通过 Option 组件来实现数据的选择和过滤，并将结果传递给 Table 组件进行渲染。

const App: React.FC = () => {
  const initialData: Row[] = [
    { name: "John Doe", age: 28, country: "USA" },
    { name: "Jane Smith", age: 34, country: "UK" },
    { name: "Sam Green", age: 23, country: "Canada" },
  ];

  const columns: Column[] = [
    { header: "Name", accessor: "name" },
    { header: "Age", accessor: "age" },
    { header: "Country", accessor: "country" },
  ];

  const [data, setData] = useState<Row[]>(initialData);
  const [tableOptions, setTableOptions] = useState({ className: "my-table" });
  const [filterOptions, setFilterOptions] = useState<OptionConfig[]>([
    {
      label: "Filter by Country",
      name: "country",
      type: "select",
      value: "",
      options: [
        { label: "All", value: "" },
        { label: "USA", value: "USA" },
        { label: "UK", value: "UK" },
        { label: "Canada", value: "Canada" },
      ],
    },
  ]);

  const handleOptionChange = (name: string, value: string | number) => {
    setFilterOptions(prevOptions =>
      prevOptions.map(option =>
        option.name === name ? { ...option, value } : option
      )
    );

    if (name === "country") {
      setData(
        value ? initialData.filter(row => row.country === value) : initialData
      );
    }
  };

  return (
    <div>
      <Table columns={columns} data={data} options={tableOptions} />
    </div>
  );
};

export default App;
