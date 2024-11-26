// Define the props for the TableRow component
interface TableRowProps {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  hemisphere: string;
}

function TableRow({
  title,
  firstName,
  lastName,
  email,
  city,
  hemisphere,
}: TableRowProps): JSX.Element {
  return (
    <tr>
      <td className="p-2 border">{title}</td>
      <td className="p-2 border">{firstName}</td>
      <td className="p-2 border">{lastName}</td>
      <td className="p-2 border">{email}</td>
      <td className="p-2 border">{city}</td>
      <td className="p-2 border">{hemisphere}</td>
    </tr>
  );
}

export default TableRow;
