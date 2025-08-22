/* eslint-disable */
import React from "react";

interface TableColumn {
  title: string;
  key: string;
}

interface TableRow {
  [key: string]: any;
}

interface ReusableTableProps {
  columns: TableColumn[];
  data: TableRow[];
}

const ReusableTable: React.FC<ReusableTableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-1 text-left text-[12px] font-semibold text-gray-700 whitespace-nowrap"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 font-normal text-[14px] whitespace-nowrap">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
