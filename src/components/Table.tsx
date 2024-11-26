import TableRow from "./TableRow";

// Define the type for a single data row
type TableRowData = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  hemisphere: string;
};

// Define the props for the Table component
interface TableProps {
  data: TableRowData[];
}

function Table({ data }: TableProps): JSX.Element {
  return (
    <table className="w-full border-collapse border text-left text-sm">
      <thead>
        <tr>
          {[
            "Title",
            "First Name",
            "Last Name",
            "Email",
            "City",
            "Hemisphere",
          ].map((header) => (
            <th key={header} className="p-2 border">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <TableRow
            title={row.title}
            firstName={row.firstName}
            lastName={row.lastName}
            email={row.email}
            city={row.city}
            hemisphere={row.hemisphere}
            key={index}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
