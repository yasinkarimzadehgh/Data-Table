import React from "react";

type TableRowProps = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  hemisphere: string;
  onDelete: () => void; // New prop for delete action
};

function TableRow({
  title,
  firstName,
  lastName,
  email,
  city,
  hemisphere,
  onDelete,
}: TableRowProps): JSX.Element {
  return (
    <tr className="hover:bg-gray-100">
      <td className="p-2 border">{title}</td>
      <td className="p-2 border">{firstName}</td>
      <td className="p-2 border">{lastName}</td>
      <td className="p-2 border">{email}</td>
      <td className="p-2 border">{city}</td>
      <td className="p-2 border">{hemisphere}</td>
      <td className="p-2 border text-center">
        {/* Delete icon */}
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700"
          aria-label="Delete row"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
}
export default TableRow;
