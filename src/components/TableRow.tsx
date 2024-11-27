import React from "react";
import { FaTrash } from "react-icons/fa"; // Import the trash can icon

type TableRowData = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  hemisphere: string;
};

interface TableRowProps extends TableRowData {
  onDelete: () => void;
  visibleColumns: string[];
}

const TableRow: React.FC<TableRowProps> = ({
  title,
  firstName,
  lastName,
  email,
  city,
  hemisphere,
  onDelete,
  visibleColumns,
}) => {
  return (
    <tr>
      {visibleColumns.includes("title") && (
        <td className="p-2 border">{title}</td>
      )}
      {visibleColumns.includes("firstName") && (
        <td className="p-2 border">{firstName}</td>
      )}
      {visibleColumns.includes("lastName") && (
        <td className="p-2 border">{lastName}</td>
      )}
      {visibleColumns.includes("email") && (
        <td className="p-2 border">{email}</td>
      )}
      {visibleColumns.includes("city") && (
        <td className="p-2 border">{city}</td>
      )}
      {visibleColumns.includes("hemisphere") && (
        <td className="p-2 border">{hemisphere}</td>
      )}
      <td className="p-2 border">
        <button className="text-red-500" onClick={onDelete}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
